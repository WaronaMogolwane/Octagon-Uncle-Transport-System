CREATE PROCEDURE `DeleteUserDetailImage` (IN _UserId VARCHAR(100))
BEGIN
	Update UserDetail
    SET ProfileImageUrl = NULL
    WHERE UserId = _UserId;
END