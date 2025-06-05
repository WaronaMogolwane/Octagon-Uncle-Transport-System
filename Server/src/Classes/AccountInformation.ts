export class AccountInformation {
  bankCode: string;
  countryCode: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  documentType: string;
  documentNumber: string;

  constructor(
    bankCode: string,
    countryCode: string,
    accountNumber: string,
    accountName: string,
    accountType: string,
    documentType: string,
    documentNumber: string
  ) {
    this.bankCode = bankCode;
    this.countryCode = countryCode;
    this.accountNumber = accountNumber;
    this.accountName = accountName;
    this.accountType = accountType;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
  }
}
