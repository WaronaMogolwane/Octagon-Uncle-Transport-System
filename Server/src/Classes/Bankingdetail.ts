export class BankingDetail {
  bankingDetailId: String;
  bankName: String;
  branchNumber: Number;
  accountNumber: Number;
  businessId: String;

  constructor(
    bankingDetailId: string,
    bankName: string,
    bankBranch: number,
    accountNumber: number,
    businessId: string
  ) {
    this.bankingDetailId = bankingDetailId;
    this.accountNumber = accountNumber;
    this.bankName = bankName;
    this.branchNumber = bankBranch;
    this.businessId = businessId;
  }
}
