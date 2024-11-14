CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateUserProfileImageUrl`(IN _ProfileImageUrl VARCHAR(100), IN _UserId VARCHAR(100))
BEGIN
UPDATE UserDetail  
 SET ProfileImageUrl = _ProfileImageUrl
WHERE UserId  = _UserId;
END