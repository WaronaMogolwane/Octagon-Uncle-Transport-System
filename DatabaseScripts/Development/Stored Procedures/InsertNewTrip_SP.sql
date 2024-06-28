CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewTrip`(IN _VehicleId varchar(100), IN _PassengerId varchar(100))
BEGIN

SET @_DVLId = (SELECT DriverVehicleLinkingId FROM DriverVehicleLinking WHERE VehicleId = _VehicleId);

INSERT INTO Trip
(PassengerId, DriverVehicleLinkingId)
VALUES
(_PassengerId, @_DVLId);
END