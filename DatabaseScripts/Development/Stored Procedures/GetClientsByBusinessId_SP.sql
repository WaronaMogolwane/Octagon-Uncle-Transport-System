CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetClientsByBusinessId`(IN _BusinessId VARCHAR(50))
BEGIN 
	SELECT ud.UserId, ubl.BusinessId, ud.FirstName, ud.LastName, User.Email
	FROM
	    User
	    INNER JOIN UserBusinessLinking ubl ON ubl.UserId = User.UserId
	    INNER JOIN UserDetail ud ON ud.UserId = User.UserId
	WHERE
	    User.ActiveStatus = '1'
	    AND User.UserRole = '3'
        AND ubl.BusinessId = _BusinessId;
END