DELIMITER $$

CREATE DEFINER =`sqladmin`@`%` PROCEDURE `GetUserByEmailPassword`
(IN _Email VARCHAR(100), IN _Password VARCHAR(50)) 
BEGIN 
	SELECT * FROM User WHERE Email = _Email AND Password = _Password;
END$$ 

DELIMITER;