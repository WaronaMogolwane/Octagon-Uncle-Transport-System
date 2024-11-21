CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `GetBulkChargesForToday`()
BEGIN
SELECT * FROM BulkCharges
WHERE DATE(CreatedAt) = CURRENT_DATE
AND Status = '1';
END