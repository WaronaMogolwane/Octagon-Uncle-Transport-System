CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerSchedule`(_PassengerId varchar(100))
BEGIN
	DELETE 
    FROM PassengerSchedule
    WHERE PassengerId = _PassengerId;
END