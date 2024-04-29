CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserDetail`(in _UserDetailId varchar(100))
BEGIN
SELECT * 
    FROM  UserDetail 
    WHERE UserDetailId = _UserDetailId;
END