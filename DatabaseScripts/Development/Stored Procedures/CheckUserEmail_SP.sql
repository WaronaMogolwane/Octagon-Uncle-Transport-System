CREATE DEFINER=`sqladmin`@`%` PROCEDURE `CheckUserEmail`(_Email VARCHAR(100))
BEGIN
	SELECT Email, UserId
    FROM User
    WHERE Email = _Email;
END