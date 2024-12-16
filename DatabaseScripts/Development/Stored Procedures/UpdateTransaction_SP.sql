CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `UpdateTransaction`(IN _TransactionReference VARCHAR(50), IN _Status VARCHAR(20))
BEGIN
UPDATE Transaction
SET
Status = _Status
WHERE 
Reference = _TransactionReference;
END