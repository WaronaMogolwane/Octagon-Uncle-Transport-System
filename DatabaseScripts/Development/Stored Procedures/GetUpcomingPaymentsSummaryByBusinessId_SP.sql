CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `GetUpcomingPaymentsSummaryByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN
SELECT 
   COUNT(*) AS NumberOfPayments,
   FLOOR((SUM(Amount) * 0.95)) AS Amount,
   MONTHNAME(curdate()) AS CurrentPeriod
FROM
    PaymentsSchedule ps
    INNER JOIN UserBusinessLinking ubl ON ps.UserId = ubl.UserId
WHERE
    ps.PaymentDay BETWEEN DAYOFMONTH(CURDATE()) AND DAYOFMONTH(LAST_DAY(CURDATE()))
    AND
    ps.IsActive = '1'
    AND
    ubl.BusinessId = _BusinessId;
END