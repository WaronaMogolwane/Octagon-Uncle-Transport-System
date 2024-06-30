CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewBusinessDetail`(in _BusinessDetailId varchar(100),in _BusinessName varchar(100),in _BusinessPhoneNumber varchar(100),in _AddressLine1 varchar(100),in _AddressLine2 varchar(100),in _Suburb varchar(100),in _City varchar(100),in _Province varchar(100),in _PostalCode varchar(100),in _BusinessId varchar(100))
BEGIN
INSERT INTO BusinessDetail
(BusinessDetailId, BusinessName, BusinessPhoneNumber, AddressLine1, AddressLine2, Suburb, City, Province, PostalCode,BusinessId)
VALUES
(_BusinessDetailId, _BusinessName, _BusinessPhoneNumber, _AddressLine1, _AddressLine2, _Suburb, _City, _Province, _PostalCode,_BusinessId);
END