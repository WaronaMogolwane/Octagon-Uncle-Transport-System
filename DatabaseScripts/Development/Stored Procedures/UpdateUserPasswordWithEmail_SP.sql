DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserPasswordWithEmail`(IN _Email VARCHAR(50), IN _Password VARCHAR(100))
BEGIN
	UPDATE `User` 
SET 
    Password = _Password
WHERE
    Email = _Email;
END$$
DELIMITER ;
