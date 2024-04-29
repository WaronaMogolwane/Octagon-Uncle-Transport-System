CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetBusinessDetail`(in _BusinessDetailId varchar(100))
BEGIN
SELECT * 
    FROM  BusinessDetail 
    WHERE BusinessDetailId = _BusinessDetailId;
END