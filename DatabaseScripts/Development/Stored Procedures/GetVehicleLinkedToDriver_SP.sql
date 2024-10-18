CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehicleLinkedToDriver`(IN _DriverId VARCHAR(50))
BEGIN 
	SELECT *
	FROM Vehicle
	WHERE VehicleId = (SELECT VehicleId FROM DriverVehicleLinking WHERE DriverId = _DriverId);
END