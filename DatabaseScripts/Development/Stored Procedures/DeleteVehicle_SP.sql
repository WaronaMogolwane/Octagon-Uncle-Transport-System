CREATE PROCEDURE `DeleteVehicle` (_VehicleId VARCHAR(100))
BEGIN
	CALL UpdatePassengerBulk(_VehicleId);
    
    CALL DeletePassengerScheduleBulk(_VehicleId);
    
    CALL DeletePassengerDriverVehicleLinkingBulk(_VehicleId);
    
    CALL DeleteDriverVehilcleLinking(_VehicleId);
    
	DELETE
    FROM Vehicle
    WHERE VehicleId = _VehicleId;
END
