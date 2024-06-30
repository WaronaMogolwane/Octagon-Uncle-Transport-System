CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteDriverVehicleLink`(IN _driverId VARCHAR(50))
BEGIN
UPDATE DriverVehicleLinking 
SET 
    IsActive = '0'
WHERE
    DriverId = _driverId AND IsActive = '1' LIMIT 1;
END