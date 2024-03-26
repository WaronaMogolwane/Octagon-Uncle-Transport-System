CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteUserInvitation`(IN _UserInvitationId VARCHAR(50), IN _UserRole TINYINT)
BEGIN
DELETE FROM UserInvitation
WHERE UserInvitationId = _UserInvitationId
AND UserRole = _UserRole;
END