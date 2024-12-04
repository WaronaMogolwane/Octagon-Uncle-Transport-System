CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetBalanceByBusinessId`(IN _BuinessId VARCHAR(50))
BEGIN
SELECT 
    FLOOR((SUM(Amount) * 0.95)) AS Balance
FROM
    Transaction t
        INNER JOIN
    UserBusinessLinking ubl ON ubl.UserId = t.UserId
WHERE
    ubl.BusinessId = _BuinessId
    AND t.Status = 'success';
END