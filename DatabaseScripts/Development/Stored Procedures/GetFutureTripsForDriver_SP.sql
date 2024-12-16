CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetFutureTripsForDriver`(in _DriverId varchar(100))
BEGIN
SELECT 
    Trip.TripId,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId AS PassengerUserId,
    Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName,
    Passenger.HomeAddress,
    Passenger.DestinationAddress
FROM
    Trip
        INNER JOIN
    Passenger ON Passenger.PassengerId = Trip.PassengerId
WHERE
    Trip.DriverId = _DriverId
        AND Trip.Date > current_date()
        AND Trip.IsCompleted = '0';
END