CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPastTripsForParent`(in _ParentId varchar(100))
BEGIN
SELECT
	Trip.TripId,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId AS PassengerUserId,
    Trip.Leg,
    UserDetail.FirstName AS DriverFirstName,
    UserDetail.LastName AS DriverLastName,
    Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName,
    Passenger.HomeAddress,
    Passenger.DestinationAddress,
    Vehicle.RegistrationNumber
FROM
    Trip
        INNER JOIN
	UserDetail ON UserDetail.UserId = Trip.DriverId
		INNER JOIN
	Passenger ON Passenger.PassengerId = Trip.PassengerId 
		INNER JOIN
	Vehicle ON Vehicle.VehicleId = Trip.VehicleId
WHERE
    (Passenger.ParentId = _ParentId
    AND Trip.Date < current_date())
    OR (Passenger.ParentId = _ParentId
    AND
    Trip.IsCompleted = '1');
END