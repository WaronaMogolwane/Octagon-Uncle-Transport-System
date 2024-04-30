CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetPastTripsForDriver`(in _DriverId varchar(100))
BEGIN
SELECT 
    Trip.TripId,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId AS PassengerUserId,
	DriverVehicleLinking.DriverId AS DriverUserId,
    DriverVehicleLinking.VehicleId,
    Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName,
	Passenger.HomeAddress,
    Passenger.DestinationAddress    
FROM
    Trip
        INNER JOIN
    DriverVehicleLinking ON DriverVehicleLinking.DriverVehicleLinkingId = Trip.DriverVehicleLinkingId
        INNER JOIN
    User ON User.UserId = DriverVehicleLinking.DriverId
        INNER JOIN
      UserDetail ON UserDetail.UserId = DriverVehicleLinking.DriverId
      INNER JOIN
      Passenger ON Passenger.PassengerId = Trip.PassengerId
WHERE
    Trip.DriverVehicleLinkingId = _DriverId
    AND Trip.Date < current_timestamp()
    OR Trip.IsCompleted = '1';

END