CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `GetDeclinedPaymentsSummaryByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN
SELECT 
    COUNT(*) AS NumberOfPayments,
    FLOOR((SUM(Amount) * 0.95)) AS Amount,
    MONTHNAME(CURDATE()) AS CurrentPeriod
FROM
    Transaction t
        INNER JOIN
    UserBusinessLinking ubl ON t.UserId = ubl.UserId
WHERE
    t.Status = 'failed'
        AND ubl.BusinessId = _BusinessId
        AND ubl.IsActive = '1';
END