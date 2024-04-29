CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassenger`(in _PassengerId varchar(100))
BEGIN
	SELECT * 
    FROM  Passenger 
    WHERE PassengerId = _PassengerId;
END