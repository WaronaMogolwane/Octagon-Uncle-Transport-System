CREATE PROCEDURE `UpdateUserEmail` (_Email VARCHAR(100), _UserId VARCHAR(100))
BEGIN
	UPDATE User
    SET Email = _Email
    WHERE UserId = _UserId;
END
