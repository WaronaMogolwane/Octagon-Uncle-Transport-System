import { NextFunction, Response, Request } from "express";
import { Customer } from "../Classes/Customer";
import { Transaction } from "../Classes/Transaction";
import { WebhookEvent } from "../Classes/WebhookEvent";
import { stringFormat } from '../Extensions/StringExtensions';
import { CreateNewCardAuthorisation, CreateNewTransaction } from "../Controllers/PaymentsController";
import axios from "axios";
const payStackPublicKey: string = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY;
const payStackApiUrl: string = process.env.OUTS_PAYSTACK_API_URL;
export const CreateNewPaystackCustomer = async (customer: Customer, callback: (error: any, result: any) => void) => { }
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
            callback(error, null);
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
            callback(error, null);
        });

}
export const HandleWebhookEvent = async (req: Request, res: Response, next: NextFunction) => {
    const webHookEvent: WebhookEvent = Object.assign(new WebhookEvent(), req.body);
    switch (true) {
        case (webHookEvent.event === "charge.success"):
            {
                if (webHookEvent.data.amount === 100) {
                    await CreateNewCardAuthorisation(webHookEvent, req, res, next)
                }
                await CreateNewTransaction(webHookEvent, req, res, next)
                break;
            }
    }
}