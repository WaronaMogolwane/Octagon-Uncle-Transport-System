CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPassengersPendingForBusiness`(_BusinessId VARCHAR(100))
BEGIN
	SELECT 
	Passenger.PassengerId,
	Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName,
    Passenger.Age,
    Passenger.HomeAddress,
    Passenger.DestinationAddress,
    Passenger.ParentId,
    Passenger.BusinessId,
    Passenger.DestinationAddress,
    Passenger.IsActive,
    Passenger.IsAssigned,
    Passenger.IsDeleted,
    UserDetail.UserDetailId,
    UserDetail.FirstName AS ParentFirstName,
    UserDetail.LastName AS ParentLastName,
    UserDetail.AddressLine1,
    UserDetail.AddressLine2,
    UserDetail.Suburb,
    UserDetail.City,
    UserDetail.Province,
    UserDetail.PostalCode,
    UserDetail.UserId,
    PassengerDeleteReason.Reason
    FROM Passenger
	INNER JOIN
		UserDetail ON UserDetail.UserId = Passenger.ParentId
	INNER JOIN
		PassengerDeleteReason ON PassengerDeleteReason.PassengerId = Passenger.PassengerId
    WHERE BusinessId = _BusinessId
    AND isDeleted= '1';
END