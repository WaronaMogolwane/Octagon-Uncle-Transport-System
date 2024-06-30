CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewDriverVehicleLink`(IN _driverId VARCHAR(50),IN _vehicleId VARCHAR(50))
BEGIN
INSERT INTO DriverVehicleLinking
(VehicleId, DriverId)
VALUES
(_vehicleId, _driverId)
ON DUPLICATE KEY
UPDATE `VehicleId` = _vehicleId,
`DriverId` = _driverId,
`DateAdded` = CURRENT_TIMESTAMP();
END