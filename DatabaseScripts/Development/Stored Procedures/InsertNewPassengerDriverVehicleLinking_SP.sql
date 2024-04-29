CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewPassengerDriverVehicleLinking`(in _VehicleId varchar(100),in _BusinessId varchar(100),in _PassengerId varchar(100))
BEGIN

SET @_DriverVehicleLinkingId = (select DriverVehicleLinkingId from DriverVehicleLinking where DriverVehicleLinking.VehicleId = _VehicleId), 
@_IsActive = (select IsActive from Passenger where PassengerId = _PassengerId);

INSERT INTO PassengerDriverVehicleLinking
( DriverVehicleLinkingId, BusinessId, PassengerId, IsActive)
VALUES
( @_DriverVehicleLinkingId, _BusinessId, _PassengerId, @_IsActive);
END