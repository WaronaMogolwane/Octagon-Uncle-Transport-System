CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPaymentsForThisMonthByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN
SELECT 
    COUNT(*) AS NumberOfPayments,
    FLOOR((SUM(Amount) * 1)) AS Amount,
    MONTHNAME(CURDATE()) AS CurrentPeriod
FROM
    PaymentsSchedule ps
        INNER JOIN
    UserBusinessLinking ubl ON ps.UserId = ubl.UserId
WHERE
    ubl.BusinessId = _BusinessId
    AND ps.IsActive = '1'
    AND ubl.IsActive;
END