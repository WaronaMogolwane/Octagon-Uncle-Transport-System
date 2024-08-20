import { NextFunction, Response, Request } from "express";
import { Customer } from "../Classes/Customer";
import { Transaction } from "../Classes/Transaction";
import { WebhookEvent } from "../Classes/WebhookEvent";
import { CreateNewCardAuthorisation } from "../Controllers/PaymentsController";

export const CreateNewPaystackCustomer = async (customer: Customer, callback: (error: any, result: any) => void) => { }
export const CreatePaystackTransactionLink = async (transaction: Transaction, callback: (error: any, result: any) => void) => { }
export const HandleWebhookEvent = async (req: Request, res: Response, next: NextFunction) => {
    const webHookEvent: WebhookEvent = Object.assign(new WebhookEvent(), req.body);
    switch (true) {
        case (webHookEvent.event === "charge.success" && webHookEvent.data.amount === 100):
            {
                await CreateNewCardAuthorisation(webHookEvent, req, res, next)
                res.status(200);
                break;
            }
    }
}