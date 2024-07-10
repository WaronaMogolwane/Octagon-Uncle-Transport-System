CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewVehicle`(in _RegistrationNumber varchar(100),in _Make varchar(100),
 in _Model varchar(100),in _Vin varchar(100), in _EngineNumber varchar(100), in _Colour varchar(100), 
 in _BusinessId varchar(100),  _LicenseNumber varchar(10), _FrontImageUrl varchar(500),
 _RearImageUrl varchar(500), _LicensePlateImageUrl varchar(500))
BEGIN
IF
(SELECT 
    IF(COUNT(*) > 0, 1, 0)
FROM
    Vehicle
WHERE
    LicenseNumber = _LicenseNumber
        AND BusinessId = _BusinessId) > 0
THEN 
UPDATE Vehicle 
SET 
    IsActive = 1
WHERE
    LicenseNumber = _LicenseNumber
        AND BusinessId = _BusinessId;
ELSE
INSERT INTO Vehicle
( RegistrationNumber, Make, Model, Vin, EngineNumber, Colour, BusinessId, LicenseNumber, FrontImageUrl, RearImageUrl, LicensePlateImageUrl)
VALUES
( _RegistrationNumber, _Make, _Model, _Vin, _EngineNumber, _Colour, _BusinessId, _LicenseNumber, _FrontImageUrl, _RearImageUrl, _LicensePlateImageUrl);
END IF;
END