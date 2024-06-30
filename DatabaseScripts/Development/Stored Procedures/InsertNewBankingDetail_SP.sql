CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewBankingDetail`(_BankingDetailId VARCHAR(100), _BankName VARCHAR(100), _BranchNumber BIGINT,_AccountName VARCHAR(100), _AccountNumber BIGINT, _BusinessId VARCHAR(1000))
BEGIN
INSERT INTO BankingDetail
(BankingDetailId, BankName, BranchNumber, AccountNumber,AccountName, BusinessId)
VALUES
(_BankingDetailId, _BankName, _BranchNumber, _AccountNumber,_AccountName, _BusinessId);
END