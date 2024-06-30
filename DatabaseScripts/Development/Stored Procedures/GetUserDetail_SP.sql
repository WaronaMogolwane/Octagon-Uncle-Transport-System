CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserDetail`(in _UserId varchar(100))
BEGIN
SELECT * 
    FROM  UserDetail 
    WHERE UserId = _UserId;
END