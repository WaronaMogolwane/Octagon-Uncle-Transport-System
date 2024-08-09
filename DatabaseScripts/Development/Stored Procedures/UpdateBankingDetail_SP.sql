CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateBankingDetail`(_BankingDetailId VARCHAR(100), _BankName VARCHAR(100), _BranchNumber BIGINT,_AccountName VARCHAR(100), _AccountNumber BIGINT, _BusinessId VARCHAR(1000), _PaystackId VARCHAR(1000), _PaystackCode VARCHAR(1000))
BEGIN
UPDATE BankingDetail  
 SET BankName = _BankName,
  	 BranchNumber = _BranchNumber,
      AccountName = _AccountName,
  	 AccountNumber = _AccountNumber,
      PaystackId = _PaystackId, 
      PaystackCode = _PaystackCode
WHERE BusinessId = _BusinessId;
END