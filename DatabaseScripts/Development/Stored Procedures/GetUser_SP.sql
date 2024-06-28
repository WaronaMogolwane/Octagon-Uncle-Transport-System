CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetUser`(_UserId VARCHAR(100))
BEGIN
	SELECT Email, Password, FirstName, LastName
	FROM User
	INNER JOIN
		UserDetail ON UserDetail.UserId = User.UserId
WHERE User.UserId = _UserId;
END