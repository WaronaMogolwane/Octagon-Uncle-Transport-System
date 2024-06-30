CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserPassword`(_OldPassword VARCHAR(100), _Password VARCHAR(100), _UserId VARCHAR(100))
BEGIN
	UPDATE User
    SET Password = _Password
    WHERE UserId = _UserId
    AND Password = _OldPassword;
END