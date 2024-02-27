DELIMITER $$
CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewUser`(in _UserId varchar(100), in _Email varchar(100), in _Password varchar(100), in _UserRole int)
BEGIN
INSERT INTO User
(UserId , Email, Password,  UserRole)
VALUES
(_UserId , _Email, _Password, _UserRole);
END$$
DELIMITER ;
