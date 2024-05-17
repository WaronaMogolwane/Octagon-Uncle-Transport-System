CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerAllByBusinessId`(_BusinessId VARCHAR(100))
BEGIN

SELECT * 
    FROM  Passenger 
    WHERE BusinessId = _BusinessId;
END