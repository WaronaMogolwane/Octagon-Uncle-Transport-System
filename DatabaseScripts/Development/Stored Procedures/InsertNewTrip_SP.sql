CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewTrip`(IN _VehicleId int, IN _PassengerId varchar(100), IN _BusinessId varchar(100))
BEGIN

SET @_DriverId = (SELECT DriverId FROM DriverVehicleLinking WHERE VehicleId = _VehicleId);

INSERT INTO Trip
(PassengerId, VehicleId, DriverId, BusinessId, Leg)
VALUES
(_PassengerId, _VehicleId, @_DriverId, _BusinessId, '0');

INSERT INTO Trip
(PassengerId, VehicleId, DriverId, BusinessId, Leg)
VALUES
(_PassengerId, _VehicleId, @_DriverId, _BusinessId, '1');
END