export class BankingDetail {
  bankName: string;
  branchNumber: string;
  accountName: string;
  accountNumber: string;
  businessId: string;
  paystackBankId: string;
  paystackBankCode: string;
  recipientCode: string;
  bankingDetailId?: string;

  constructor(
    bankName: string,
    branchNumber: string,
    accountName: string,
    accountNumber: string,
    businessId: string,
    bankId: string,
    bankCode: string,
    recipientCode: string,
    bankingDetailId?: string,
  ) {
    this.bankName = bankName;
    this.branchNumber = branchNumber;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.businessId = businessId;
    this.paystackBankId = bankId;
    this.paystackBankCode = bankCode;
    this.recipientCode = recipientCode;
    this.bankingDetailId = bankingDetailId;
  }
}
