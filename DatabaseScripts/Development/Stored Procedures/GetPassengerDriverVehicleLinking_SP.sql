CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerDriverVehicleLinking`(in _BusinessId varchar(100))
BEGIN
	SELECT PassengerDriverVehicleLinking.PassengerDriverVehicleLinkingId,
		   PassengerDriverVehicleLinking.DriverVehicleLinkingId,
           PassengerDriverVehicleLinking.PassengerId,
           Passenger.FirstName,
           Passenger.LastName,
           Passenger.Age,
           Passenger.HomeAddress,
           Passenger.DestinationAddress
	FROM   PassengerDriverVehicleLinking
		INNER JOIN
		   Passenger ON Passenger.PassengerId = PassengerDriverVehicleLinking.PassengerId
	WHERE  PassengerDriverVehicleLinking.BusinessId = _BusinessId
    AND    Passenger.IsAssigned = '1'
    AND    Passenger.IsActive = '1';		
END