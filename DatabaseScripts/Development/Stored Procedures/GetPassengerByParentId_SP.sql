CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerByParentId`(in _ParentId varchar(100))
BEGIN
SELECT * 
    FROM  Passenger 
INNER JOIN
	PassengerDeleteReason ON PassengerDeleteReason.PassengerId = Passenger.PassengerId
    WHERE ParentId = _ParentId;
END