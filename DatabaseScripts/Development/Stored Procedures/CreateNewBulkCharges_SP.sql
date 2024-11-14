CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `CreatePendingCharges`()
BEGIN
SET @PendingTransactionsToday = (SELECT COUNT(*) FROM Transaction
WHERE Date(DateCreated) = Date(CURDATE())
AND Status = 'Pending');
IF(@PendingTransactionsToday > 0)
THEN
INSERT INTO Transaction
(
UserId,
Amount,
Currency,
Status,
Refernece,
DateCreated,
TransactionType
)
SELECT 
    UserId,
    Amount,
    'ZAR' AS Currency,
    'Pending' AS Status,
    CONCAT('RC-', UUID()) AS Refernece,
    CURRENT_TIMESTAMP() AS DateCreated,
    'Recurring charge' AS TransactionType
FROM
    (SELECT 
        ps.Amount,
            CURRENT_TIMESTAMP() AS DateCreated,
            ca.AuthorizationCode,
            ca.UserId,
            UUID() AS TransporterUserId,
            ca.CardAuthorisationId
    FROM
        PaymentsSchedule ps
    INNER JOIN CardAuthorisation ca ON ca.CardAuthorisationId = ps.CardAuthorisationId
    WHERE
        ps.PaymentDay = DAYOFMONTH(CURRENT_TIMESTAMP())
            AND ps.IsActive = '1') AS TempPendingCharges;
END IF;
END