CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateBusinessDetail`(in _BusinessDetailId varchar(100),in _BusinessName varchar(100),in _BusinessPhoneNumber varchar(100),in _AddressLine1 varchar(100),in _AddressLine2 varchar(100),in _Suburb varchar(100),in _City varchar(100),in _Province varchar(100),in _PostalCode varchar(100),in _BusinessId varchar(100))
BEGIN
UPDATE BusinessDetail  
 SET BusinessName = _BusinessName,
  	 BusinessPhoneNumber = _BusinessPhoneNumber,
  	 AddressLine1 = _AddressLine1,
	 AddressLine2 = _AddressLine2,
  	 Suburb = _Suburb,
     City = _City ,
     Province = _Province,
     PostalCode = _PostalCode
WHERE BusinessId = _BusinessId;
END