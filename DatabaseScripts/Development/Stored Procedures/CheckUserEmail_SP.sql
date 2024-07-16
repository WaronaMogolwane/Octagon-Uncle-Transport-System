CREATE PROCEDURE `CheckUserEmail` (_Email VARCHAR(100))
BEGIN
	SELECT Email
    FROM User
    WHERE Email = _Email;
END
