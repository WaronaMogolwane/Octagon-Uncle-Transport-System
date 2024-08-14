import { NextFunction, Request, Response } from "express";
import { Customer } from "../Classes/Customer";
import { CreateNewPaystackCustomer } from "../Models/PaymentsModel";

export const HandleWebhookEvent = (req: Request, res: Response, next: NextFunction) => {

}
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
    await CreateNewPaystackCustomer(newCustomer, (error, result) => {
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
export const ChargeAuthorization = (req: Request, res: Response, next: NextFunction) => {

}