import { ChargeAuthorization, CreateNewPaystackRefund } from './../Services/PaystackService';
import { Authorization, Data, WebhookEvent } from './../Classes/WebhookEvent';
import { NextFunction, Request, Response } from "express";
import { Customer } from "../Classes/Customer";
import { CreateNewPaystackCustomer, CreatePaystackTransactionLink } from "../Services/PaystackService";
import { InsertCardAuthorisation, InsertNewRefund, InsertNewTransaction } from '../Models/PaymentsModel';
import { ErrorResponse } from '../Classes/ErrorResponse';
import { stringFormat } from '../Extensions/StringExtensions';
import { Transaction } from '../Classes/Transaction';
import { CardAuthorisation } from '../Classes/CardAuthorisation';
import { Refund } from '../Classes/Refund';


export const CreateNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
    let requestBody: any = req.body;
    let newCustomer: Customer = ({
        customerId: '',
        customerEmail: requestBody.email,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        customerCode: '',
        domain: '',
        dateCreated: '',
        dateUpdated: '',
        userId: requestBody.userId,
        isActive: '1'
    })
    await CreateNewPaystackCustomer(newCustomer, (error: any, result: any) => {
        if (error) {
            res.status(400).json(error);
        }
        else {
            res.status(200).json(result);
        }
    })

}
export const CreateNewPlan = (req: Request, res: Response, next: NextFunction) => {
}
export const CreateNewSubscription = (req: Request, res: Response, next: NextFunction) => {
}
export const CreateTransactionLink = async (req: Request, res: Response, next: NextFunction) => {
    await CreatePaystackTransactionLink(req, res, (error: any, response: any) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
        else {
            res.status(200).send(response)
        }
    })
}
export const CreateNewCardAuthorisation = async (webhookEvent: WebhookEvent, req: Request, res: Response, next: NextFunction) => {
    const data: Data = webhookEvent.data;
    const authorisation: Authorization = data.authorization;
    const cardAuthorisation: CardAuthorisation = ({
        cardAuthorisationId: "",
        userId: data.metadata.user_id,
        authorizationCode: authorisation.authorization_code,
        maskedCardNumber: stringFormat("******{0}", authorisation.last4),
        cardExpiryMonth: authorisation.exp_month,
        cardExpiryYear: authorisation.exp_year,
        cardType: authorisation.card_type,
        bankName: authorisation.bank,
        countryCode: authorisation.country_code,
        dateCreated: data.created_at
    });

    await InsertCardAuthorisation(cardAuthorisation, (error: any, result: any) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
    })
}
export const CreateNewCharge = async (req: Request, res: Response, next: NextFunction) => {
    await ChargeAuthorization(req, res, (error: any, response: any) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
        else {
            res.status(200).send({ message: "Authorization successfully charged." })
        }
    })
}
export const CreateNewTransaction = async (webhookEvent: WebhookEvent, req: Request, res: Response, next: NextFunction) => {
    const data: Data = webhookEvent.data;
    let newTransaction: Transaction = ({
        transactionId: data.id,
        userId: data.metadata.user_id,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        reference: data.reference,
        dateCreated: new Date(data.created_at),
        datePaid: new Date(data.paid_at),
        transactionType: data.channel
    })
    await InsertNewTransaction(newTransaction, (error, result) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
        else {
            res.status(200).send({ message: "Transaction successfully created." })
        }
    })
}

export const RefundTransaction = async (req: Request, res: Response, next: NextFunction) => {
    let newRefund: Refund = ({
        transaction: req.body.transaction,
        amount: req.body.amount,
        currency: req.body.currency,
        merchant_note: req.body.merchant_note,
    })
    await CreateNewPaystackRefund(newRefund, (error: any, response: any) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
        else {
            res.status(200).send(response)
        }
    })
}
export const CreateNewRefund = async (webHookEvent: WebhookEvent, req: Request, res: Response, next: NextFunction) => {
    let reqBody: any = req.body;
    let newRefund: Refund = ({
        transaction: webHookEvent.data.id,
        amount: webHookEvent.data.amount,
        currency: webHookEvent.data.currency,
        merchant_note: req.body.data.merchant_note,
        customer_note: req.body.data.customer_note
    })
    await InsertNewRefund(newRefund, (error: any, result: any) => {
        if (error) {
            const err: ErrorResponse = ({ status: 400, message: error })
            next(err);
        }
        else {
            res.status(200).send({ message: "Refund successfully created." })
        }
    })
}
