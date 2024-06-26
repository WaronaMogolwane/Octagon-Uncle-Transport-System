CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetDriversByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN 
	SELECT 
    ud.FirstName,
    ud.LastName,
    v.VehicleId,
    v.LicenseNumber,
    u.UserId,
    ubl.BusinessId,
    u.Email
FROM
    User u
        INNER JOIN
    UserDetail ud ON ud.UserId = u.UserId
        INNER JOIN
    UserBusinessLinking ubl ON ubl.UserId = u.UserId
        LEFT JOIN
    DriverVehicleLinking dvl ON dvl.DriverId = u.UserId
        LEFT JOIN
    Vehicle v ON v.VehicleId = dvl.VehicleId
WHERE
    u.UserRole = 2
        AND ubl.BusinessId = _BusinessId
        AND u.ActiveStatus = 1;
END