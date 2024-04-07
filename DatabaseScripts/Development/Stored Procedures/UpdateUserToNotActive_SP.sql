CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserToNotActive`(IN _UserId VARCHAR(50), IN _UserRole TINYINT)
BEGIN 
	UPDATE User
	SET
	    ActiveStatus = 0
	WHERE
	    UserRole = _UserRole
	    AND UserId = _UserId;
END