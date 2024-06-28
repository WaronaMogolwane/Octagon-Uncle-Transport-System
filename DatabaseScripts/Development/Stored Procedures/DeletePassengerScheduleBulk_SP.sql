CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerScheduleBulk`(_VehicleId VARCHAR(100))
BEGIN
	DELETE
    FROM PassengerSchedule
    WHERE DriverVehicleLiningId IN (SELECT DriverVehicleLiningId FROM DriverVehicleLining WHERE VehicleId = _VehicleId);
END