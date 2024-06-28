CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdatePassengerBulk`(_VehicleId VARCHAR(100))
BEGIN
	SET @_DriverVehicleLinkingId = (SELECT DriverVehicleLinkingId FROM DriverVehicleLinking WHERE VehicleId = _VehicleId);
    
	UPDATE Passenger 
SET 
    IsAssigned = '0'
WHERE
    PassengerId IN (SELECT 
            PassengerId
        FROM
            PassengerSchedule
        WHERE
            DriverVehicleLinkingId = @_DriverVehicleLinkingId);
END