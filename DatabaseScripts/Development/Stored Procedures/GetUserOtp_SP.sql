DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertUserOtp`(in _Email varchar(50), in _Otp varchar(5))
BEGIN
INSERT INTO UserOtp
(Email, Otp, DateCreated, OtpExpireDate)
VALUES
(_Email, _Otp, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
ON DUPLICATE KEY
UPDATE `Otp` = _OTP,
`DateCreated` = CURRENT_TIMESTAMP(),
`OtpExpireDate` = CURRENT_TIMESTAMP();
END$$
DELIMITER ;
