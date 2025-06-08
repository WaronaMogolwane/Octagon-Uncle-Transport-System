import { NextFunction, Request, Response } from "express";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { stringFormat } from "../Extensions/StringExtensions";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { Customer } from "../Classes/Customer";
import { BulkCharge, BulkChargeReponse } from "../Classes/BulkCharge";
import { Refund } from "../Classes/Refund";
import {
    BulkBankTransfer,
    BankTransfer,
    TransferRecipient,
    TransferWebHookEvent
} from "../Classes/Transfer";
import { RefundWebhookEvent, TransactionWebhookEvent } from "../Classes/WebhookEvent";
import { CreateNewRefund, UpdateTransfer, CreateNewCardAuthorisation, CreateSuccessfulTransaction } from "../Controllers/PaymentsController";
import dotenv from "dotenv";
import { PaystackListTransactionsResponse } from "../Classes/Transaction";
dotenv.config();
const payStackPublicKey: string = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY!;
const payStackApiUrl: string = process.env.OUTS_PAYSTACK_API_URL!;

const MakePaystackRequest = async (
    config: AxiosRequestConfig,
    callback: (error: any, result: any) => void
): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.request(config);
        callback(null, response.data);
    } catch (error: any) {
        callback(error?.response?.data, null);
    }
};

// API operations
export const CreateNewPaystackCustomer = async (
    customer: Customer,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/customer"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: customer,
    };
    MakePaystackRequest(config, callback);
};

export const CreateNewPaystackRefund = async (
    newRefund: Refund,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/refund"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: newRefund,
    };
    MakePaystackRequest(config, callback);
};
export const CreatePaystackTransactionLink = async (
    req: Request,
    res: Response,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transaction/initialize"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: req.body,
    };
    MakePaystackRequest(config, callback);
};

export const ChargeAuthorization = async (
    req: Request,
    res: Response,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transaction/charge_authorization"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: req.body,
    };
    MakePaystackRequest(config, callback);
};

export const CreateTransferRecipient = async (
    transferRecipient: TransferRecipient,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transferrecipient"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: transferRecipient,
    };
    MakePaystackRequest(config, callback);
};

export const InitiateTransfer = async (
    newTransfer: BankTransfer,
    callback: (error: any, result: any) => void
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transfer"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: newTransfer,
    };
    MakePaystackRequest(config, callback);
};

/**
 * Initiates the bulk transfer process via Paystack's API.
 */
export const InitiateBulkTransfer = async (
    bulkTransfer: any
): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transfer/bulk"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: bulkTransfer,
    };

    try {
        const response: AxiosResponse = await axios.request(config);
        //  No callback.  Return the response, or handle it here.
        return response.data; //  Or return the whole response if needed.
    } catch (error: any) {
        let errorMessage = "Bulk transfer failed";
        let errorData: any;

        if (error.response) {
            errorMessage += `: ${error.response.status} - ${error.response.data.message || 'No message from Paystack'}`;
            errorData = error.response.data;
        } else if (error.request) {
            errorMessage += ": No response received from Paystack";
            errorData = { request: error.request };
        } else {
            errorMessage += `: ${error.message}`;
            errorData = { error: error };
        }
        //  Throw the error, so the caller can handle it.
        throw new ErrorResponse(500, errorMessage, errorData);
    }
};
export const HandleWebhookEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const webHookEvent: TransactionWebhookEvent = Object.assign(
        new TransactionWebhookEvent(),
        req.body
    );

    switch (webHookEvent.event) {
        case "charge.success":
            HandleSuccessfulCharge(webHookEvent, req, res, next);
            break;
        case "refund.processed":
            const refundEvent = Object.assign(new RefundWebhookEvent(), req.body);
            await HandleRefund(refundEvent, req, res, next);
            break;
        case "transfer.success":
        case "transfer.failed":
        case "transfer.reversed":
            const transferEvent = Object.assign(new TransferWebHookEvent(), req.body);
            await HandleTransfer(transferEvent, req, res, next);
            break;
        default:
            res.status(400).json({ message: "Unhandled webhook event." });
    }
};
export const InitiateBulkCharge = async (charges: BulkCharge[], callback: (error: any, result: any) => void) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/bulkcharge'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: charges
    };

    axios.request(config)
        .then((response: AxiosResponse) => {
            callback(null, response);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}

async function HandleRefund(
    webHookEvent: RefundWebhookEvent,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    await CreateNewRefund(webHookEvent, req, res, (error, result) => {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(200).json({ message: "Refund already exists." });
        } else if (error) {
            next(new ErrorResponse(400, error.message, error.stack));
        } else {
            res.status(200).json({ message: "Refund successfully created." });
        }
    });
}

async function HandleTransfer(
    webHookEvent: TransferWebHookEvent,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    await UpdateTransfer(webHookEvent, req, res, (error, result) => {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(200).json({ message: "Transfer already exists." });
        } else if (error) {
            next(new ErrorResponse(400, error.message, error.stack));
        } else {
            res.status(200).json({ message: "Transfer successfully created." });
        }
    });
}

async function HandleSuccessfulCharge(
    webHookEvent: TransactionWebhookEvent,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    let authorizationExists = false;

    if (
        webHookEvent.data.amount === 100 &&
        webHookEvent.data.metadata.charge_type === "Card Authorization"
    ) {
        CreateNewCardAuthorisation(webHookEvent, (error: ErrorResponse, result) => {
            const errMessage: string = error?.message || "Error creating card authorization";
            if (error && errMessage
                .includes("ER_DUP_ENTRY")) {
                authorizationExists = true;
            } else if (error) {
                next(new ErrorResponse(400, error.message, error.stack));
            }
        });
    }

    setTimeout(() => {
        CreateSuccessfulTransaction(webHookEvent, req, res, (error, result) => {
            if (error && error.code === "ER_DUP_ENTRY") {
                if (!authorizationExists) {
                    res.status(200).json({ message: "Transaction already exists." });
                }
            } else if (error) {
                next(new ErrorResponse(400, error.message, error.stack));
            } else {
                res.status(200).json({
                    message: "Transaction successfully created.",
                    AuthorizationExists: authorizationExists,
                });
            }
        });
    }, 100);
}
export const FetchPaystackTransactions = async (fromDate: string, toDate: string, page: number = 1, perPage: number = 100): Promise<PaystackListTransactionsResponse | null> => {

    try {
        const response: AxiosResponse = await axios.get(
            'https://api.paystack.co/transaction',
            {
                headers: {
                    Authorization: `Bearer ${payStackPublicKey}`,
                },
                params: {
                    from: fromDate,
                    to: toDate,
                    perPage: perPage,
                    page: page,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching transactions from Paystack (page ${page}): ${error.message}`);
        return null;
    }
};