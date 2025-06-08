CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserEmailByInvitationCode`(IN _InvitationCode VARCHAR(100))
BEGIN
	SELECT Email
    FROM UserInvitation
    WHERE InvitationCode = _InvitationCode;
END