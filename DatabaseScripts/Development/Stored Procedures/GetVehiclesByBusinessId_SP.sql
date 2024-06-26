CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehiclesByBusinessId`(IN _businessId VARCHAR(50))
BEGIN
SELECT 
v.VehicleId,
v.RegistrationNumber, 
v.Make, 
v.Model, 
v.Vin, 
v.EngineNumber, 
v.Color, 
v.LicenseNumber, 
v.FrontImageUrl, 
v.RearImageUrl,
dvl.DriverId,
CONCAT(CONCAT(ud.FirstName, ' '), ud.LastName) AS DriverFullName
FROM Vehicle v
LEFT JOIN DriverVehicleLinking dvl ON dvl.VehicleId = v.VehicleId
LEFT JOIN UserDetail ud ON ud.UserId = dvl.DriverId
LEFT JOIN User u ON u.UserId = dvl.DriverId
AND u.ActiveStatus = 1
WHERE BusinessId = _businessId
ORDER BY v.RegistrationNumber DESC;
END