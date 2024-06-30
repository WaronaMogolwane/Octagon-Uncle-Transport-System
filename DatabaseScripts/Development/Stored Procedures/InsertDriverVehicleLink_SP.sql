CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertDriverVehicleLink`(IN _driverId VARCHAR(50),IN _vehicleId INT)
BEGIN
IF
(SELECT 
    IF(COUNT(*) > 0, 1, 0)
FROM
    DriverVehicleLinking
WHERE
    DriverId = _driverId) > 0
THEN 
CALL DeleteDriverVehicleLinkByDriverId(_driverId);
END IF;
INSERT INTO DriverVehicleLinking
(VehicleId, DriverId)
VALUES
(_vehicleId, _driverId)
ON DUPLICATE KEY
UPDATE `VehicleId` = _vehicleId,
`DriverId` = _driverId,
`IsActive` = '1',
`DateAdded` = CURRENT_TIMESTAMP();
END