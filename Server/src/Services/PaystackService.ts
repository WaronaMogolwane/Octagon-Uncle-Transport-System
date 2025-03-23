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
import { CreateNewRefund, UpdateTransfer, CreateNewCardAuthorisation, CreateNewTransaction } from "../Controllers/PaymentsController";
import dotenv from "dotenv";
dotenv.config();
const payStackPublicKey: string = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY!;
const payStackApiUrl: string = process.env.OUTS_PAYSTACK_API_URL!;

const makePaystackRequest = async (
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
    makePaystackRequest(config, callback);
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
    makePaystackRequest(config, callback);
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
    makePaystackRequest(config, callback);
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
    makePaystackRequest(config, callback);
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
    makePaystackRequest(config, callback);
};

export const InitiateTransfer = async (
    newTransfer: BankTransfer,
    callback: (error: any, result: any) => void
): Promise<void> => {
    console.log(payStackApiUrl)
    const config: AxiosRequestConfig = {
        method: "post",
        url: stringFormat(payStackApiUrl, "/transfer"),
        headers: {
            Authorization: `Bearer ${payStackPublicKey}`,
            "Content-Type": "application/json",
        },
        data: newTransfer,
    };
    makePaystackRequest(config, callback);
};

/**
 * Initiates the bulk transfer process via Paystack's API.
 */
export const InitiateBulkTransfer = async (bulkTransfer: BulkBankTransfer, callback: (response: any) => void): Promise<void> => {
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
        callback(response);
    } catch (error: any) {
        const errorData = error?.response?.data || "Unknown error";
        throw new ErrorResponse(500, "Bulk transfer failed", errorData);
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
        CreateNewCardAuthorisation(webHookEvent, (error, result) => {
            if (error && error.message.includes("ER_DUP_ENTRY")) {
                authorizationExists = true;
            } else if (error) {
                next(new ErrorResponse(400, error.message, error.stack));
            }
        });
    }

    setTimeout(() => {
        CreateNewTransaction(webHookEvent, req, res, (error, result) => {
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
