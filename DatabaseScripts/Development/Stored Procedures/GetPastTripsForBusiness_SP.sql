CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPastTripsForBusiness`(IN _BusinessId VARCHAR(100), IN _VehicleId VARCHAR(100))
BEGIN
SELECT 
    Trip.TripId,
    UserDetail.FirstName,
    UserDetail.LastName,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId,
    Trip.Leg,
    Passenger.HomeAddress,
    Passenger.DestinationAddress,
	Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName
FROM
    Trip
        INNER JOIN
    UserDetail ON UserDetail.UserId = Trip.DriverId
		INNER JOIN
    Passenger ON Passenger.PassengerId = Trip.PassengerId
WHERE
    (Trip.BusinessId = _BusinessId
    AND Trip.VehicleId = _VehicleId)
	AND 
    (Trip.Date < current_date()
	OR  Trip.IsCompleted = '1');
END