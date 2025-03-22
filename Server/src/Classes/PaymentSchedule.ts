export class PaymentSchedule {
    UserId: string;
    Amount: string;
    CardAuthorisationId: string;
    PaymentDay: number;
    PaymentsScheduleId?: string;
    DateCreated?: Date;
    IsActive?: boolean;
    constructor(
        UserId: string,
        Amount: string,
        CardAuthorisationId: string,
        PaymentDay: number,
        PaymentsScheduleId?: string,
        DateCreated?: Date,
        IsActive?: boolean
    ) {
        this.PaymentsScheduleId = PaymentsScheduleId;
        this.UserId = UserId;
        this.Amount = Amount;
        this.DateCreated = DateCreated;
        this.CardAuthorisationId = CardAuthorisationId;
        this.PaymentDay = PaymentDay;
        this.IsActive = IsActive;
        this.DateCreated = DateCreated;
    }
}