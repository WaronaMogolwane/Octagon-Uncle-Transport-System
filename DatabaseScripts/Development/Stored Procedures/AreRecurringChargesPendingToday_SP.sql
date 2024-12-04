CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `AreRecurringChargesPendingToday`()
BEGIN
SET @AreRecurringChargesPendingToday = (SELECT COUNT(*) FROM Transaction
WHERE Date(DateCreated) = Date(CURDATE())
AND Status = 'Pending');
SELECT 
    IF(@AreRecurringChargesPendingToday > 0,
        TRUE,
        FALSE) AS 'AreRecurringChargesPendingToday';
END