DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserOtp`(in _Email varchar(100), in _Otp varchar(5))
BEGIN
	    SELECT *
	    FROM UserOtp
	    WHERE
	        Otp = _Otp
	        AND Email = _Email
            AND IsUsed = 0;
END$$
DELIMITER ;
