CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassenger`(_PassengerId VARCHAR(100))
BEGIN
    CALL DeletePassengerDeleteReason(_PassengerId);
    
	DELETE
    FROM Passenger
    Where PassengerId = _PassengerId;
END