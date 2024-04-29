CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerByBusinessId`(in _BusinessId varchar(100))
BEGIN
SELECT * 
    FROM  Passenger 
    WHERE BusinessId = _BusinessId
    AND IsActive = '1'
    AND IsAssigned = '0';
END