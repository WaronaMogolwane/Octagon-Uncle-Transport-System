CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserInvitationByEmailUserRole`(in _Email varchar(100), in _UserRole varchar(1))
BEGIN 
	SELECT *
	FROM UserInvitation
	WHERE
	    Email = _Email
	    AND UserRole = _UserRole;
END