CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengerActiveByParentId`(in _ParentId varchar(100))
BEGIN
SELECT * 
    FROM  Passenger
    WHERE ParentId = _ParentId
    AND IsActive = 1;
END