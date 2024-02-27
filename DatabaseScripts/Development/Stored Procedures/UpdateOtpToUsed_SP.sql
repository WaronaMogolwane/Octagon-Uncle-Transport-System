DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateOtpToUsed`(in _Email varchar(50), in _Otp varchar(5))
BEGIN 
	UPDATE UserOtp
	SET
	    IsUsed = 1
	WHERE
	    Email = _Email
	    AND Otp = _Otp
	    AND IsUsed = 0;
END$$
DELIMITER ;
