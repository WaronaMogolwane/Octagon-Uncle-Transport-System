CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `GetPaymentsByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN
SELECT t.TransactionId, ud.FirstName, ud.LastName, t.Amount, t.Status, t.DatePaid FROM Transaction t
INNER JOIN UserBusinessLinking ubl ON ubl.UserId = t.UserId
INNER JOIN UserDetail ud ON ud.UserId = t.UserId
WHERE ubl.BusinessId = _BusinessId
AND t.Status = 'success' OR t.Status = 'failed';
END