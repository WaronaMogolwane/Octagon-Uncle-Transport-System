CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerByParentId`(in _ParentId varchar(100))
BEGIN
SELECT * 
    FROM  Passenger 
    WHERE ParentId = _ParentId;
END