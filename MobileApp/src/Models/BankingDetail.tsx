export class BankingDetail {
  bankName: string;
  branchNumber: string;
  accountName: string;
  accountNumber: string;
  businessId: string;
  paystackBankId: string;
  paystackBankCode: string;
  accountType: string;
  documentType: string;
  documentNumber: string;
  bankingDetailId?: string;
  recipientCode?: string;

  constructor(
    bankName: string,
    branchNumber: string,
    accountName: string,
    accountNumber: string,
    businessId: string,
    bankId: string,
    paystackBankCode: string,
    accountType: string,
    documentType: string,
    documentNumber: string,
    bankingDetailId?: string,
    recipientCode?: string,
  ) {
    this.bankName = bankName;
    this.branchNumber = branchNumber;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.businessId = businessId;
    this.paystackBankId = bankId;
    this.paystackBankCode = paystackBankCode;
    this.accountType = accountType;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.bankingDetailId = bankingDetailId;
    this.recipientCode = recipientCode;
  }
}
