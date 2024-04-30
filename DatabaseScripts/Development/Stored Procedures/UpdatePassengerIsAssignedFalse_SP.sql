CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdatePassengerIsAssignedFalse`(in _PassengerId varchar(100))
BEGIN
	UPDATE Passenger
	SET IsAssigned = '0'
	WHERE PassengerId = _PassengerId;
END