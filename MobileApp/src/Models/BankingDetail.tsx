export class BankingDetail {
  bankName: string;
  branchNumber: string;
  accountName: string;
  accountNumber: string;
  businessId: string;
  bankingDetailId?: string;

  constructor(
    bankName: string,
    branchNumber: string,
    accountName: string,
    accountNumber: string,
    businessId: string,
    bankingDetailId?: string,
  ) {
    this.bankName = bankName;
    this.branchNumber = branchNumber;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.businessId = businessId;
    this.bankingDetailId = bankingDetailId;
  }
}
