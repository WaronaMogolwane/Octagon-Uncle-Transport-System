CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateBankingDetail`(_BankingDetailId VARCHAR(100), _BankName VARCHAR(100), _BranchNumber BIGINT, _AccountNumber BIGINT, _BusinessId VARCHAR(1000))
BEGIN
UPDATE BankingDetail  
 SET BankName = _BankName,
  	 BranchNumber = _BranchNumber,
  	 AccountNumber = _AccountNumber
WHERE BusinessId = _BusinessId;
END