CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerSchedule`(IN _PassengerId VARCHAR(100))
BEGIN
	SELECT *
    FROM PassengerSchedule
    WHERE PassengerId = _PassengerId;
END