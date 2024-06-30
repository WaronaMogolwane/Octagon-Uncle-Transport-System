CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetBusinessDetail`(in _BusinessId varchar(100))
BEGIN
SELECT * 
    FROM  BusinessDetail 
    WHERE BusinessId = _BusinessId;
END