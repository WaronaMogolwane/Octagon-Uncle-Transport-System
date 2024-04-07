CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetDriversByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN 
	SELECT ud.UserId, ubl.BusinessId, ud.FirstName, ud.LastName, User.Email, v.RegistrationNumber
	FROM
	    User
	    INNER JOIN UserBusinessLinking ubl ON ubl.UserId = User.UserId
	    INNER JOIN UserDetail ud ON ud.UserId = User.UserId
        LEFT JOIN DriverVehicleLinking dvl ON dvl.DriverId = User.UserId
        LEFT JOIN Vehicle v ON v.VehicleId =  dvl.VehicleId
	WHERE
	    User.ActiveStatus = '1'
	    AND User.UserRole = 2
        AND ubl.BusinessId = _BusinessId;
END