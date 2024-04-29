CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdatePassengerIsAssigned`(in _PassengerId varchar(100))
BEGIN
	UPDATE Passenger
	SET IsAssigned = '1'
	WHERE PassengerId = _PassengerId;
END