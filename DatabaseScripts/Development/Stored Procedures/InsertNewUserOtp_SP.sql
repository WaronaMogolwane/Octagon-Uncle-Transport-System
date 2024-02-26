DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewUserOtp`(in _Email varchar(50), in _Otp varchar(5))
BEGIN
INSERT INTO UserOtp
(Email, Otp)
VALUES
(_Email, _Otp)
ON DUPLICATE KEY
UPDATE `Otp` = _OTP;
END$$
DELIMITER ;
