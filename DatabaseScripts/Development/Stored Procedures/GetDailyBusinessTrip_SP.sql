CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetDailyBusinessTrip`(IN _BusinessId VARCHAR(100))
BEGIN
	SELECT *
    FROM Trip
    WHERE BusinessId = _BusinessId
    AND  Date = current_date();
END