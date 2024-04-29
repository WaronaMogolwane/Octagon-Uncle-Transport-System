CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetDriverVehicleLinkingDriverId`(_VehicleId varchar(100))
BEGIN
	SELECT DriverId
    FROM DriverVehicleLinking
    WHERE VehicleId = _VehicleId;
END