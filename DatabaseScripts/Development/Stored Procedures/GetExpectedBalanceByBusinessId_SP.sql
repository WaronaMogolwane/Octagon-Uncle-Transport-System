CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetExpectedBalanceByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN
SELECT 
    FLOOR((SUM(Amount) * 0.95)) AS ExpectedBalance
FROM
    PaymentsSchedule ps
        INNER JOIN
    UserBusinessLinking ubl ON ubl.UserId = ps.UserId
WHERE
    ubl.BusinessId = _BusinessId
    AND ps.IsActive = 1;
END