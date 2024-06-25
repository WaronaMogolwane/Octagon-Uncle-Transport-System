CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetBusinessDetailForParent`(_BusinessId VARCHAR(100))
BEGIN
	SELECT UserDetail.FirstName,
		   UserDetail.LastName,
           BusinessDetail.BusinessName,
           BusinessDetail.BusinessPhoneNumber,
           BusinessDetail.AddressLine1,
           BusinessDetail.AddressLine2,
           User.Email
    FROM BusinessDetail
		INNER JOIN 
    UserDetail ON UserDetail.UserId = BusinessDetail.BusinessId
		INNER JOIN
	User ON User.UserId = BusinessDetail.BusinessId
    WHERE BusinessDetail.BusinessId = _BusinessId;    
END