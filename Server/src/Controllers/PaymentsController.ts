import { CardAuthorisation } from './../Classes/CardAuthorisation';
import { Authorization, Data, WebhookEvent } from './../Classes/WebhookEvent';
import { NextFunction, Request, Response } from "express";
import { Customer } from "../Classes/Customer";
import { CreateNewPaystackCustomer, CreatePaystackTransactionLink } from "../Services/PaystackService";
import { InsertCardAuthorisation } from '../Models/PaymentsModel';
import { ErrorResponse } from '../Classes/ErrorResponse';
import { stringFormat } from '../Extensions/StringExtensions';


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
export const CreateTransactionLink = (req: Request, res: Response, next: NextFunction) => {
}
export const CreateNewCardAuthorisation = async (webhookEvent: WebhookEvent, req: Request, res: Response, next: NextFunction) => {
    const data: Data = webhookEvent.data;
    const authorisation: Authorization = data.authorization;
    const cardAuthorisation: CardAuthorisation = ({
        cardAuthorisationId: "",
        userId: data.metadata.custom_fields[0].user_id,
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
        else {
            res.status(200).send({ message: "Card authorisation successfully added." })
        }

    })
}
export const ChargeAuthorization = (req: Request, res: Response, next: NextFunction) => {
}
