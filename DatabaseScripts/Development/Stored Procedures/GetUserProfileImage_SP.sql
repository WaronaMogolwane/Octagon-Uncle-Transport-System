CREATE PROCEDURE `GetUserProfileImage` (IN _UserId VARCHAR(100))
BEGIN
	SELECT ProfileImageUrl
    FROM UserDetail
    WHERE UserId = _UserId;
END
