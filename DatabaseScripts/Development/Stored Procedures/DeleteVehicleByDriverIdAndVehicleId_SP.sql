CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteVehicleByDriverIdAndVehicleId`(IN _driverId VARCHAR(50), IN _vehicleId INT)
BEGIN
IF
(SELECT 
    IF(COUNT(*) > 0, 1, 0)
FROM
    DriverVehicleLinking
WHERE
    DriverId = _driverId) > 0
THEN 
CALL DeleteDriverVehicleLink(_driverId);
END IF;
UPDATE Vehicle 
SET 
    IsActive = 0
WHERE
    VehicleId = _vehicleId;
END