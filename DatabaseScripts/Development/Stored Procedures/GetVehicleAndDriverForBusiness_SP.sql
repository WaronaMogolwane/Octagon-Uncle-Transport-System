CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehicleAndDriverForBusiness`(in _BusinessId varchar(100))
BEGIN
SELECT 
    v.VehicleId,
    v.RegistrationNumber,
    v.Make,
    v.Model,
    v.Vin,
    v.EngineNumber,
    v.Colour,
    v.LicenseNumber,
    dvl.DriverId,
    ud.FirstName, 
    ud.LastName
FROM
    Vehicle v
        LEFT JOIN
    DriverVehicleLinking dvl ON dvl.VehicleId = v.VehicleId
        AND dvl.IsActive = 1
        LEFT JOIN
    UserDetail ud ON ud.UserId = dvl.DriverId
        LEFT JOIN
    User u ON u.UserId = dvl.DriverId
        AND u.ActiveStatus = 1
WHERE
    BusinessId = _BusinessId
        AND v.IsActive = 1;
END