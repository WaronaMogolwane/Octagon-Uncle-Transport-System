CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteDriverVehilcleLinking`(_VehicleId VARCHAR(100))
BEGIN
	DELETE
    FROM DrivervehicleLinking
    WHERE VehicleId = _VehicleId;
END