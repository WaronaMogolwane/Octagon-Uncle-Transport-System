CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserByEmailPassword`(IN _Email VARCHAR(100), IN _Password VARCHAR(50))
BEGIN
	SELECT u.UserId, u.UserRole, u.Email, ubl.BusinessId 
    FROM  User as u
	INNER JOIN UserBusinessLinking ubl ON ubl.UserId = u.UserId
	WHERE Email = _Email
    AND Password = _Password
    AND ubl.UserId = u.UserId;
END