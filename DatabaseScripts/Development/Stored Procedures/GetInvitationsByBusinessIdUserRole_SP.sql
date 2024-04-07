CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetInvitationsByBusinessIdUserRole`(in _BusinessId varchar(100), in _UserRole varchar(1))
BEGIN 
	SELECT *
	FROM UserInvitation
	WHERE
	    BusinessId = _BusinessId
	    AND UserRole = _UserRole
        AND IsUsed = '0';
END