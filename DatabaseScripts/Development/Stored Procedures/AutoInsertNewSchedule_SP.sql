CREATE DEFINER=`sqladmin`@`%` PROCEDURE `AutoInsertNewSchedule`(_Day varchar(100))
BEGIN
	
    SET	@_BusinessId = (SELECT 
    Passenger.BusinessId
FROM
    Passenger
        INNER JOIN
    PassengerSchedule ON PassengerSchedule.PassengerId = Passenger.PassengerId
WHERE
    Passenger.PassengerId = PassengerSchedule.PassengerId);
	    
	INSERT INTO PassengerDriverVehicleLinking (DriverVehicleLinkingId, BusinessId, PassengerId)
    SELECT DriverVehicleLinkingId, @_BusinessId, PassengerId
    FROM PassengerSchedule 
    WHERE Tuesday = '1';
END