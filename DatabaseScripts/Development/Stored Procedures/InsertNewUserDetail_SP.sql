CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewUserDetail`(in _UserDetailId varchar(100),in _FirstName varchar(100),in _LastName varchar(100),in _Cellphone varchar(20),in _AddressLine1 varchar(100),in _AddressLine2 varchar(100),in _Suburb varchar(100),in _City varchar(100), in _Province varchar(100), in _PostalCode varchar(100), in _UserId varchar(100))
BEGIN
INSERT INTO UserDetail
(UserDetailId, FirstName, LastName, Cellphone, AddressLine1, AddressLine2, Suburb, City, Province, PostalCode, UserId)
VALUES
(_UserDetailId, _FirstName, _LastName, _Cellphone, _AddressLine1, _AddressLine2, _Suburb, _City, _Province, _PostalCode, _UserId);
END