CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserInvitationToUsed`(in _InvitationCode varchar(100), in _UserRole tinyint(1))
BEGIN
UPDATE UserInvitation  
 SET IsUsed = 1
	WHERE InvitationCode  = _InvitationCode
    AND UserRole = _UserRole
    AND IsUsed = 0;
END