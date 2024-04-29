CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehicleAndDriverForBusiness`(in _BusinessId varchar(100))
BEGIN
SELECT
	Vehicle.VehicleId,
    Vehicle.RegistrationNumber,
    Vehicle.Make,
    Vehicle.Model,
    Vehicle.Color,
    UserDetail.FirstName,
    UserDetail.LastName
FROM
	DriverVehicleLinking
		INNER JOIN
	Vehicle ON Vehicle.VehicleId = DriverVehicleLinking.VehicleId
		INNER JOIN
	UserBusinessLinking ON UserBusinessLinking.UserId = DriverVehicleLinking.DriverID
    	INNER JOIN
	User ON User.UserId = UserBusinessLinking.UserId
    	INNER JOIN
	UserDetail ON UserDetail.UserId = User.UserId
WHERE
    UserBusinessLinking.BusinessId = _BusinessId
AND 
	User.UserRole = 2;
END