CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewBankingDetail`(_BankName VARCHAR(100), _BranchNumber BIGINT,_AccountName VARCHAR(100), _AccountNumber BIGINT, _BusinessId VARCHAR(1000), _PaystackBankId VARCHAR(1000), _PaystackBankCode VARCHAR(1000), _RecipientCode VARCHAR(1000))
BEGIN
INSERT INTO BankingDetail
(BankName, BranchNumber, AccountNumber,AccountName, BusinessId, PaystackBankId, PaystackBankCode, RecipientCode)
VALUES
(_BankName, _BranchNumber, _AccountNumber,_AccountName, _BusinessId, _PaystackBankId, _PaystackBankCode, _RecipientCode);
END