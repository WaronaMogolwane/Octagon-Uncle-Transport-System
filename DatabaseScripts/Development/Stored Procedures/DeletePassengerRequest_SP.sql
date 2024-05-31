CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerRequest`(_PassengerId VARCHAR(100), _Reason VARCHAR(100))
BEGIN
	CALL InsertNewPasengerDeleteReason(_PassengerId, _Reason);

	UPDATE Passenger 
SET 
    IsDeleted = '1'
WHERE
    PassengerId = _PassengerId;    
END