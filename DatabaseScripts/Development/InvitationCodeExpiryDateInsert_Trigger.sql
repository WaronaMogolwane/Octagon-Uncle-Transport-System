CREATE
DEFINER=`sqladmin`@`%`
TRIGGER `Dev-Octagon-Uncle-Transport`.`InvitationCodeExpiryDateInsert`
BEFORE INSERT ON `Dev-Octagon-Uncle-Transport`.`InvitationCode`
FOR EACH ROW
SET NEW.ExpiryDate =  DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 7 DAY)