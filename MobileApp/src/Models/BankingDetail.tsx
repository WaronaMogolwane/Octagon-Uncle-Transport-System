export class BankingDetail {
  bankName: string;
  branchNumber: string;
  accountName: string;
  accountNumber: string;
  businessId: string;
  bankId: string;
  bankCode: string;
  bankingDetailId?: string;

  constructor(
    bankName: string,
    branchNumber: string,
    accountName: string,
    accountNumber: string,
    businessId: string,
    bankId: string,
    bankCode: string,
    bankingDetailId?: string,
  ) {
    this.bankName = bankName;
    this.branchNumber = branchNumber;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.businessId = businessId;
    this.bankId = bankId;
    this.bankCode = bankCode;
    this.bankingDetailId = bankingDetailId;
  }
}
