CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserDetail`(in _UserDetailId varchar(100),in _FirstName varchar(100),in _LastName varchar(100),in _Cellphone varchar(20),in _AddressLine1 varchar(100),in _AddressLine2 varchar(100),in _Suburb varchar(100),in _City varchar(100), in _Province varchar(100), in _PostalCode varchar(100), in _UserId varchar(100))
BEGIN
UPDATE UserDetail  
 SET FirstName = _FirstName,
  	 LastName  = _LastName,
  	 Cellphone  = _Cellphone,
  	 AddressLine1  = _AddressLine1 ,
	 AddressLine2  = _AddressLine2,
  	 Suburb  = _Suburb,
     City  = _City,
  	 Province  = _Province ,
     PostalCode  = _PostalCode
WHERE UserDetailId  = _UserDetailId;
END