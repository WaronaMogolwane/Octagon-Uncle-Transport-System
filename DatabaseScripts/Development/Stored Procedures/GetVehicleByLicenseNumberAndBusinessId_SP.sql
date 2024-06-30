CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetVehicleByLicenseNumberAndBusinessId`(IN _licenseNumber varchar(20), IN _businessId VARCHAR(50))
BEGIN
	SELECT * 
    FROM  Vehicle 
    WHERE BusinessId = _businessId
    AND LicenseNumber = _licenseNumber;
END