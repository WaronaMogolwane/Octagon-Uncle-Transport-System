CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetBulkCharges`()
BEGIN
SELECT 
    ps.Amount,
    ca.AuthorizationCode,
    ca.UserId,
    UUID() AS 'Transporter User Id'
FROM
    PaymentsSchedule ps
        INNER JOIN
    CardAuthorisation ca ON ca.CardAuthorisationId = ps.CardAuthorisationId
WHERE
    ps.PaymentDay = DAYOFMONTH(CURRENT_TIMESTAMP())
        AND ps.IsActive = '1';
END