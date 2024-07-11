CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPendingDriversByBusinessId`(in _BusinessId varchar(100))
BEGIN 
	SELECT *
	FROM UserInvitation
	WHERE
	    BusinessId = _BusinessId
	    AND UserRole = 3
        AND IsUsed = 0;
END