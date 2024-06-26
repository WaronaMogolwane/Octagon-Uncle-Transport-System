CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewVehicle`(
 in _RegistrationNumber varchar(100),in _Make varchar(100),
 in _Model varchar(100),in _Vin varchar(100), in _EngineNumber varchar(100), in _Color varchar(100), 
 in _BusinessId varchar(100),  _LicenseNumber varchar(10), _FrontImageUrl varchar(500),
 _RearImageUrl varchar(500), _LicensePlateImageUrl varchar(500))
BEGIN
INSERT INTO Vehicle
( RegistrationNumber, Make, Model, Vin, EngineNumber, Color, BusinessId, LicenseNumber, FrontImageUrl, RearImageUrl, LicensePlateImageUrl)
VALUES
( _RegistrationNumber, _Make, _Model, _Vin, _EngineNumber, _Color, _BusinessId, _LicenseNumber, _FrontImageUrl, _RearImageUrl, _LicensePlateImageUrl);
END