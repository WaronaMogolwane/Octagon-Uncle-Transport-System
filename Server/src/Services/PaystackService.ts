import { BulkBankTransfer, BankTransfer, TransferRecipient, TransferWebHookEvent } from './../Classes/Transfer';
import { NextFunction, Response, Request } from "express";
import { Customer } from "../Classes/Customer";
import { TransactionWebhookEvent } from "../Classes/WebhookEvent";
import { stringFormat } from '../Extensions/StringExtensions';
import { CreateNewCardAuthorisation, CreateNewRefund, CreateNewTransaction, SaveNewTransfer, UpdateTransfer } from "../Controllers/PaymentsController";
import axios, { AxiosResponse } from "axios";
import { Refund } from "../Classes/Refund";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { BulkCharge, BulkChargeReponse } from "../Classes/BulkCharge";
import { QueryError } from "mysql2";
const payStackPublicKey: string = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY;
const payStackApiUrl: string = process.env.OUTS_PAYSTACK_API_URL;
export const CreateNewPaystackCustomer = async (customer: Customer, callback: (error: any, result: any) => void) => { }
export const CreateNewPaystackRefund = async (newRefund: Refund, callback: (error: any, result: any) => void) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/refund'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: newRefund
    };
    axios.request(config)
        .then((response: any) => {
            callback(null, response.data);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}
export const CreatePaystackTransactionLink = async (req: Request, res: Response, callback: (error: any, result: any) => void) => {
    let data = req.body;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/transaction/initialize'),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey)
        },
        data: data
    };
    axios.request(config)
        .then((response) => {
            callback(null, response.data);
        })
        .catch((error) => {
            callback(error.response.data, null);
        });
}
export const ChargeAuthorization = async (req: Request, res: Response, callback: (error: any, result: any) => void) => {
    let data = req.body;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/transaction/charge_authorization'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: data
    };

    axios.request(config)
        .then((response: any) => {
            callback(null, response.data);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}
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
export const CreateTransferRecipient = async (transferRecipient: TransferRecipient, callback: (error: any, result: any) => void) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/transferrecipient'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: transferRecipient
    };

    axios.request(config)
        .then((response: AxiosResponse) => {
            callback(null, response);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}
export const InitiateTransfer = async (newTransfer: BankTransfer, callback: (error: any, result: any) => void) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/transfer'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: newTransfer
    };
    axios.request(config)
        .then((response: AxiosResponse) => {
            callback(null, response);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}
export const InitiateBulkTransfer = async (newBulkTransfer: BulkBankTransfer, callback: (error: any, result: any) => void) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: stringFormat(payStackApiUrl, '/transfer/bulk'),
        headers: {
            'Authorization': stringFormat('Bearer {0}', payStackPublicKey),
            'Content-Type': 'application/json',
        },
        data: newBulkTransfer
    };

    axios.request(config)
        .then((response: AxiosResponse) => {
            callback(null, response);
        })
        .catch((error: any) => {
            callback(error.response.data, null);
        });
}
export const HandleWebhookEvent = async (req: Request, res: Response, next: NextFunction) => {
    const webHookEvent: TransactionWebhookEvent = Object.assign(new TransactionWebhookEvent(), req.body);
    switch (true) {
        case (webHookEvent.event === "charge.success"):
            const chargeWebHookEvent: TransactionWebhookEvent = Object.assign(new TransactionWebhookEvent(), req.body);
            HandleSuccessfulCharge(chargeWebHookEvent, req, res, next);
            break;
        case (webHookEvent.event === "refund.processed"):
            await HandleRefund(webHookEvent, req, res, next);
            break;
        case (webHookEvent.event === "transfer.success"):
            const transferWebHookEvent: TransferWebHookEvent = Object.assign(new TransferWebHookEvent(), req.body);
            await HandleTransfer(transferWebHookEvent, req, res, next);
            break;
        case (webHookEvent.event === "transfer.failed"):
            const failedTransferWebHookEvent: TransferWebHookEvent = Object.assign(new TransferWebHookEvent(), req.body);
            await HandleTransfer(failedTransferWebHookEvent, req, res, next);
            break;
        case (webHookEvent.event === "transfer.reversed"):
            const reversedTransferWebHookEvent: TransferWebHookEvent = Object.assign(new TransferWebHookEvent(), req.body);
            await HandleTransfer(reversedTransferWebHookEvent, req, res, next);
            break;
    }
}
async function HandleRefund(webHookEvent: TransactionWebhookEvent, req: Request, res: Response<any, Record<string, any>>, next: NextFunction) {
    await CreateNewRefund(webHookEvent, req, res, (error: QueryError, result: any) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(200).json({ message: "Refund already exists." });
            }
            else {
                const err: Error = new Error(error.message)
                next(new ErrorResponse(400, err.message, err.stack));
            }
        } else {
            res.status(200).json({ message: "Refund successfully created." });
        }
    });
}
async function HandleTransfer(webHookEvent: TransferWebHookEvent, req: Request, res: Response<any, Record<string, any>>, next: NextFunction) {
    await UpdateTransfer(webHookEvent, req, res, (error: QueryError, result: any) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(200).json({ message: "Transfer already exists." });
            }
            else {
                const err: Error = new Error(error.message)
                next(new ErrorResponse(400, err.message, err.stack));
            }
        } else {
            res.status(200).json({ message: "Transfer successfully created." });
        }
    });
}
async function HandleSuccessfulCharge(webHookEvent: TransactionWebhookEvent, req: Request, res: Response, next: NextFunction) {
    let authorizationExists: boolean = false;
    {
        if (webHookEvent.data.amount === 100 && webHookEvent.data.metadata.charge_type === "Card Authorization") {
            CreateNewCardAuthorisation(webHookEvent, (error: QueryError, result: any) => {
                if (error) {
                    if (error.message['code'] === 'ER_DUP_ENTRY') {
                        authorizationExists = true;
                        try {
                            res.status(200).json({ message: "Card authorization already exists." });
                        } catch (error) {
                            const err: Error = new Error(error.message)
                            next(new ErrorResponse(400, err.message, err.stack));
                        }
                    }
                    else {
                        const err: Error = new Error(error.message)
                        next(new ErrorResponse(400, err.message, err.stack));
                    }
                } else {
                    let newRefund: Refund = ({
                        transaction: webHookEvent.data.id,
                        amount: webHookEvent.data.amount,
                        currency: webHookEvent.data.currency,
                        merchant_note: "Card authorization refund",
                    })
                    CreateNewPaystackRefund(newRefund, async (error: any, result: any) => {
                        if (error) {
                            const err: Error = new Error(error.message)
                            next(new ErrorResponse(400, err.message, err.stack));
                        }
                    })
                }
            }
            )
        }
        setTimeout(async () => {
            await CreateNewTransaction(webHookEvent, req, res, (error: QueryError, result: any) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        if (!authorizationExists)
                            try {
                                res.status(200).json({ message: "Transaction already exists." });
                            } catch (error) {
                                const err: Error = new Error(error.message)
                                next(new ErrorResponse(400, err.message, err.stack));
                            }
                    }
                    else {
                        const err: Error = new Error(error.message)
                        next(new ErrorResponse(400, err.message, err.stack));
                    }
                } else {
                    res.status(200).json({ message: "Transaction successfully created." })
                }
            })

        }, 100)
    }
}