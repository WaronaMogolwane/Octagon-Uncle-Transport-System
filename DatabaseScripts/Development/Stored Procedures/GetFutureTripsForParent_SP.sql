CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetFutureTripsForParent`(in _ParentId varchar(100))
BEGIN
SELECT 
    Trip.TripId,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId AS PassengerUserId,
    UserDetail.FirstName AS DriverFirstName,
    UserDetail.LastName AS DriverLastName,
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
    Passenger.ParentId = _ParentId
    AND Trip.Date > current_timestamp()
    AND Trip.IsCompleted ='0';
END