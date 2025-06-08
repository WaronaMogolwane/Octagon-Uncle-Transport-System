CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertUserInvitation`(in _BusinessId varchar(100),in _InvitationCode varchar(100),in _UserRole varchar(100) ,in _Email varchar(100),in _FirstName varchar(100),in _LastName varchar(100),  _UserId varchar(100))
BEGIN
INSERT INTO `UserInvitation`
(BusinessId, InvitationCode, UserRole, Email, FirstName, LastName, UserId)
VALUES
( _BusinessId, _InvitationCode, _UserRole,_Email, _FirstName, _LastName, _UserId)
ON DUPLICATE KEY
UPDATE `InvitationCode` = _InvitationCode,
`IsUsed` = 0,
`DateCreated` = CURRENT_TIMESTAMP(),
`ExpiryDate` = CURRENT_TIMESTAMP();
END