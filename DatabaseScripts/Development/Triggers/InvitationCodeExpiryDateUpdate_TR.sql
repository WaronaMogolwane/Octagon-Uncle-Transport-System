CREATE DEFINER=`sqladmin`@`%` TRIGGER `InvitationCodeExpiryDateUpdate` BEFORE UPDATE ON `UserInvitation` FOR EACH ROW SET NEW.ExpiryDate =  DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 7 DAY)