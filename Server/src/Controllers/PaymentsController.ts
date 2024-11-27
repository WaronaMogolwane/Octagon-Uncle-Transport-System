import { BankTransfer, Recipient, Transfer, TransferRecipient, TransferWebHookEvent } from './../Classes/Transfer';
import { GetBulkChargesForToday, InsertNewBulkCharge, GetNewBulkCharge, InsertNewTransfer, AreRecurringChargesPendingToday, InsertPendingCharges, GetAvailableBalanceByBusinessId } from './../Models/PaymentsModel';
import { InitiateBulkCharge, ChargeAuthorization, CreateNewPaystackRefund, CreateTransferRecipient, InitiateTransfer } from './../Services/PaystackService';
import { Authorization, Data, TransactionWebhookEvent } from './../Classes/WebhookEvent';
import { NextFunction, Request, Response } from "express";
import { Customer } from "../Classes/Customer";
import { CreateNewPaystackCustomer, CreatePaystackTransactionLink } from "../Services/PaystackService";
import { InsertCardAuthorisation, InsertNewRefund, InsertNewTransaction } from '../Models/PaymentsModel';
import { ErrorResponse } from '../Classes/ErrorResponse';
import { stringFormat } from '../Extensions/StringExtensions';
import { Transaction } from '../Classes/Transaction';
import { CardAuthorisation } from '../Classes/CardAuthorisation';
import { Refund } from '../Classes/Refund';
import { Charge } from '../Classes/Charge';
import { BulkCharge, BulkChargeReponse as BulkChargeResponse } from '../Classes/BulkCharge';
import { ifError } from 'assert';
import { randomUUID } from 'crypto';
import { AxiosResponse } from 'axios';
import { CustomLogger } from '../Classes/CustomLogger';
import { OkPacket, QueryError } from 'mysql2';
import { TransferResponse } from '../Classes/BankTransferResponse';
const bulkChargeSize: number = 1000;

const Logger: CustomLogger = new CustomLogger();
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
export const CreateNewTransferRecipient = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: any = req.body;
    let newTransferRecipient: TransferRecipient = ({
        type: reqBody.type,
        description: reqBody.description,
        name: reqBody.name,
        account_number: reqBody.accountNumber,
        bank_code: reqBody.bankCode,
        currency: reqBody.currency
    })
    await CreateTransferRecipient(newTransferRecipient, (error: any, result: any) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            res.status(200).json({ message: "Transfer recipient successfully created." })
        }
    })
}
export const CreateTransactionLink = async (req: Request, res: Response, next: NextFunction) => {
    await CreatePaystackTransactionLink(req, res, (error: any, response: any) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            res.status(200).json(response)
        }
    })
}
export const CreateNewCardAuthorisation = async (webhookEvent: TransactionWebhookEvent, callback: (error: any, result: any) => void) => {
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
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    })
}
export const CreateNewCharge = async (req: Request, res: Response, next: NextFunction) => {
    await ChargeAuthorization(req, res, (error: any, response: any) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            res.status(200).json({ message: "Authorization successfully charged." })
        }
    })
}
export const CreateNewBulkCharge = async (req: Request, res: Response, next: NextFunction) => {
    let charges: any = [{}];
    await InitiateBulkCharge(charges, (error: any, result: any) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            const response: BulkChargeResponse = Object.assign(new BulkChargeResponse(), result.data);
            res.status(200).json({ message: "Bulk charge successfully initiated." })
        }
    })
}
export const CreateNewTransaction = async (webhookEvent: TransactionWebhookEvent, req: Request, res: Response, callback: (error: any, result: any) => void) => {
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
    await InsertNewTransaction(newTransaction, (error: QueryError, result) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
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
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            res.status(200).json(response)
        }
    })
}
export const CreateNewRefund = async (webHookEvent: TransactionWebhookEvent, req: Request, res: Response, callback: (error: any, result: any) => void) => {
    let newRefund: Refund = ({
        transaction: webHookEvent.data.id,
        amount: webHookEvent.data.amount,
        currency: webHookEvent.data.currency,
        merchant_note: req.body.data.merchant_note,
        customer_note: req.body.data.customer_note
    })
    await InsertNewRefund(newRefund, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    })
}
export const SaveNewTransfer = async (transferResponse: TransferResponse, callback: (error: any, result: any) => void) => {
    let newTransfer: Transfer = ({
        transferCode: transferResponse.data.transfer_code,
        amount: transferResponse.data.amount,
        currency: transferResponse.data.currency,
        status: "Pending",
        reference: transferResponse.data.reference,
        reason: transferResponse.data.reason,
        dateCreated: new Date(transferResponse.data.createdAt || transferResponse.data.created_at),
        dateUpdated: new Date(transferResponse.data.updatedAt || transferResponse.data.updated_at) || null,
        transactionType: "Bank Transfer",
        paystackId: transferResponse.data.id
    })
    await InsertNewTransfer(newTransfer, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    })
}
export const UpdateTransfer = async (webHookEvent: TransferWebHookEvent, req: Request, res: Response, callback: (error: any, result: any) => void) => {
    let newTransfer: Transfer = ({
        transferCode: webHookEvent.data.transfer_code,
        amount: webHookEvent.data.amount,
        currency: webHookEvent.data.currency,
        status: webHookEvent.data.status,
        reference: webHookEvent.data.reference,
        reason: webHookEvent.data.reason,
        dateCreated: new Date(webHookEvent.data.createdAt || webHookEvent.data.created_at),
        dateUpdated: new Date(webHookEvent.data.updatedAt || webHookEvent.data.update_at) || null,
        transactionType: "Bank Transfer",
        paystackId: webHookEvent.data.id

    })
    await InsertNewTransfer(newTransfer, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    })
}
export const CreateTransfer = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body;
    let newBankTransfer: BankTransfer = ({
        amount: reqBody.amount,
        source: reqBody.source,
        reference: stringFormat("BT-{0}", randomUUID()),
        recipient: reqBody.recipientCode,
        reason: reqBody.reason
    })
    InitiateTransfer(newBankTransfer, async (error: any, result: any) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            const transferResponse: TransferResponse = Object.assign(new TransferResponse(), result.data);
            if (transferResponse.status == false) {
                const err: Error = new Error(transferResponse.toString())
                next(new ErrorResponse(400, err.message, err.stack));
            }
            else {
                await SaveNewTransfer(transferResponse, (error: any, result: any) => {
                    if (error) {
                        const err: Error = new Error(error.message)
                        next(new ErrorResponse(400, err.message, err.stack));
                    }
                    else {
                        res.status(200).json(transferResponse.message)
                    }
                })
            }
        }
    })
}
export const BulkChargeAuthorizations = async (callback: (error: any, result: any) => void) => {
    await GetNewBulkCharge((error: any, response: Array<any>) => {
        if (error) {
            callback(error, null);
        }
        else {
            let data: [] = response[0];
            let bulkCharge: BulkCharge[] = [];
            data.forEach((value: any, index: number) => {
                let newCharge: any = ({
                    amount: value.Amount,
                    authorization: value.AuthorizationCode,
                    reference: value.Reference,
                    metadata: {
                        user_id: value.UserId,
                        transporter_user_id: value.TransporterUserId
                    }
                })
                bulkCharge.push(newCharge);
            })
            for (let i = 0; i < bulkCharge.length; i += bulkChargeSize) {
                const chunk: BulkCharge[] = bulkCharge.slice(i, i + bulkChargeSize);
                InitiateBulkCharge(chunk, (error: any, result: AxiosResponse) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        let response: BulkChargeResponse = Object.assign(new BulkChargeResponse(), result.data);
                        response.data.createdAt = new Date(response.data.createdAt);
                        response.data.updatedAt = new Date(response.data.updatedAt);
                        InsertNewBulkCharge(response, (error: any, result: any) => {
                            if (error) {
                                callback(error, null)
                            } else {
                                callback(null, response)
                            }
                        })

                    }
                })
            }
        }
    })
}
export const GetAllBulkChargesForCurrentDay = async (callback: (error: any, result: any) => void) => {
    await GetBulkChargesForToday((error: any, result: any) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result);
        }
    })
}
export const CreatePendingCharges = async (callback: (error: any, result: any) => void) => {
    await InsertPendingCharges((error: any, result: OkPacket) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result);
        }
    })
}
export const CheckIfRecurringChargesPendingToday = async (callback: (error: any, result: any) => void) => {
    await AreRecurringChargesPendingToday((error: any, result: any) => {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, result);
        }
    })
}
export const GetAvailableBalance = async (req: Request, res: Response, next: NextFunction) => {
    const businessId: string = req.query.businessId.toString();
    await GetAvailableBalanceByBusinessId(businessId, (error: any, result: OkPacket) => {
        if (error) {
            const err: Error = new Error(error.message)
            next(new ErrorResponse(400, err.message, err.stack));
        }
        else {
            res.status(200).json(result[0][0])
        }
    })
}