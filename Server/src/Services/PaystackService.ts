import { NextFunction, Response, Request } from "express";
import { Customer } from "../Classes/Customer";
import { Transaction } from "../Classes/Transaction";
import { WebhookEvent } from "../Classes/WebhookEvent";
import { stringFormat } from '../Extensions/StringExtensions';
import { CreateNewCardAuthorisation, CreateNewRefund, CreateNewTransaction } from "../Controllers/PaymentsController";
import axios from "axios";
import { Refund } from "../Classes/Refund";
import { ErrorResponse } from "../Classes/ErrorResponse";
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
export const HandleWebhookEvent = async (req: Request, res: Response, next: NextFunction) => {
    const webHookEvent: WebhookEvent = Object.assign(new WebhookEvent(), req.body);
    switch (true) {
        case (webHookEvent.event === "charge.success"):
            {
                {
                    if (webHookEvent.data.amount === 100) {
                        await CreateNewCardAuthorisation(webHookEvent, req, res, next)
                        let newRefund: Refund = ({
                            transaction: webHookEvent.data.id,
                            amount: webHookEvent.data.amount,
                            currency: webHookEvent.data.currency,
                            merchant_note: "Card authorization refund",
                        })
                        CreateNewPaystackRefund(newRefund, (error: any, result: any) => {
                            if (error) {
                                const err: ErrorResponse = ({ status: 400, message: error })
                                next(err);
                            }
                        })
                    }
                }
                await CreateNewTransaction(webHookEvent, req, res, next)
                break;
            }
        case (webHookEvent.event === "refund.processed"):
            {
                await CreateNewRefund(webHookEvent, req, res, next);
            }
    }
}