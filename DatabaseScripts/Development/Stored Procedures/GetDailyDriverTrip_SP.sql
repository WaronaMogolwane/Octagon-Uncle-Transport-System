CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetDailyDriverTrip`(IN _DriverId VARCHAR(100))
BEGIN
	SELECT 
    *
FROM
     Trip 
WHERE
    DriverId = _DriverId
        AND Date = current_date();
END