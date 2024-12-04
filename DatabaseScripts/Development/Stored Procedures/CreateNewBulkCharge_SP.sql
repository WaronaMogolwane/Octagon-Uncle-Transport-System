CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `CreateNewBulkCharge`()
BEGIN
SELECT 
	t.Reference,
    t.Amount,
    ca.AuthorizationCode,
    ca.UserId,
    UUID() AS TransporterUserId
FROM
    Transaction t
        INNER JOIN
    CardAuthorisation ca ON ca.UserId = t.UserId
WHERE
   t.Status = 'Pending'
   AND t.Attempts = 0;
END