CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewTempPassengerSchedule`(_PassengerId VARCHAR(100))
BEGIN
	INSERT INTO TempPassengerSchedule
    (PassengerId)
    VALUES
    (_PassengerId);
END