CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehicleLinkedToDriver`(IN _DriverId VARCHAR(50))
BEGIN 
	SELECT Vehicle.VehicleId, Vehicle.RegistrationNumber, Vehicle.Make, Vehicle.Model, Vehicle.VinNumber, Vehicle.EngineNumber, Vehicle.Color, Vehicle.DateCreated, Vehicle.DateModifed, dvl.DriverVehicleLinkingId, dvl.DriverId, dvl.DateAdded
	FROM `Dev-Octagon-Uncle-Transport`.Vehicle
	    INNER JOIN DriverVehicleLinking dvl ON dvl.VehicleId = Vehicle.VehicleId
	WHERE
	    dvl.IsActive = '1'
	    AND dvl.DriverId = _DriverId;
END