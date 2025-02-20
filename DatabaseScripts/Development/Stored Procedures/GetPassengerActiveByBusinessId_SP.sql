CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerActiveByBusinessId`(in _BusinessId varchar(100))
BEGIN
SELECT * 
    FROM  Passenger 
    WHERE BusinessId = _BusinessId
    AND IsActive = '1';
END