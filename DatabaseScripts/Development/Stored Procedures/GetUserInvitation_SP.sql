DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserInvitation`(in _InvitationCode varchar(100), IN _UserRole INT)
BEGIN
	SELECT * 
    FROM  UserInvitation
    WHERE InvitationCode = _InvitationCode
    AND UserRole = _UserRole
    AND IsUsed = 0;
END$$
DELIMITER ;
