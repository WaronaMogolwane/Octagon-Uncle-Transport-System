CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerDriverVehicleLinkingBulk`(_VehicleId VARCHAR(100))
BEGIN
	DELETE
    FROM PassengerDriverVehicleLinking
    WHERE DriverVehicleLiningId IN (SELECT DriverVehicleLiningId FROM DriverVehicleLining WHERE VehicleId = _VehicleId);
END