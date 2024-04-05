CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetLinkedUserByBusinessIdUserRole`(IN _BusinessId VARCHAR(50), _UserRole TINYINT)
BEGIN 
	SELECT ud.UserId, ubl.BusinessId, ud.FirstName, ud.LastName, User.Email
	FROM
	    User
	    INNER JOIN UserBusinessLinking ubl ON ubl.UserId = User.UserId
	    INNER JOIN UserDetail ud ON ud.UserId = User.UserId
	WHERE
	    User.ActiveStatus = '1'
	    AND User.UserRole = _UserRole
	    AND ubl.BusinessId = _BusinessId;
END