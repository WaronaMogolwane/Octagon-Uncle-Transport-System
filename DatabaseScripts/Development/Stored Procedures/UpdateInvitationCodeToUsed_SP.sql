DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateInvitationCodeToUsed`(in _InvitationCode varchar(100))
BEGIN
UPDATE InvitationCode  
 SET IsUsed = 1
	WHERE InvitationCodeId  = _InvitationCodeId
    AND IsUsed = 0;
END$$
DELIMITER ;
