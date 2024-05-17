CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengersPendingForBusiness`(_BusinessId VARCHAR(100))
BEGIN
	SELECT *
    FROM Passenger
    WHERE BusinessId = _BusinessId
    AND isDeleted= '1';
END