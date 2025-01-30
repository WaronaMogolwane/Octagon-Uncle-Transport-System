CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUserActiveStatus`(IN _UserId VARCHAR(100))
BEGIN
	SELECT ActiveStatus
    FROM User
    WHERE UserId = _UserId;
END