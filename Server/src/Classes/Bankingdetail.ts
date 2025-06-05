export class BankingDetail {
  bankingDetailId: string;
  bankName: string;
  branchNumber: Number;
  accountName: string;
  accountNumber: Number;
  businessId: string;
  paystackBankId: string;
  paystackBankCode: string;
  accountType: string;
  documentType: string;
  documentNumber: string;
  recipientCode: string;
  constructor(
    bankingDetailId: string,
    bankName: string,
    bankBranch: number,
    accountName: string,
    accountNumber: number,
    businessId: string,
    paystackBankId: string,
    paystackBankCode: string,
    accountType: string,
    documentType: string,
    documentNumber: string,
    recipientCode: string
  ) {
    this.bankingDetailId = bankingDetailId;
    this.accountNumber = accountNumber;
    this.bankName = bankName;
    this.accountName = accountName;
    this.branchNumber = bankBranch;
    this.businessId = businessId;
    this.paystackBankId = paystackBankId;
    this.paystackBankCode = paystackBankCode;
    this.accountType = accountType;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.recipientCode = recipientCode;
  }
}
