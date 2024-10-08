export class BankingDetail {
    bankingDetailId: string;
    bankName: string;
    branchNumber: Number;
    accountName: string;
    accountNumber: Number;
    businessId: string;
    paystackId: string;
    payStackCode: string;

    constructor(
        bankingDetailId: string,
        bankName: string,
        bankBranch: number,
        accountName: string,
        accountNumber: number,
        businessId: string,
        paystackId: string,
        payStackCode: string
    ) {
        this.bankingDetailId = bankingDetailId;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.accountName = accountName;
        this.branchNumber = bankBranch;
        this.businessId = businessId;
        this.paystackId = paystackId;
        this.payStackCode = payStackCode;
    }
}
