CREATE DEFINER=`sqladmin`@`%` PROCEDURE `RestoreUserPassword`(_Password VARCHAR(100), _UserId VARCHAR(100))
BEGIN
	UPDATE User
    SET Password = _Password
    WHERE UserId = _UserId;
END