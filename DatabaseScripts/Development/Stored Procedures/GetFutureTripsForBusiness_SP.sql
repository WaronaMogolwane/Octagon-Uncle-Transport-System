CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetFutureTripsForBusiness`(in _BusinessId varchar(100))
BEGIN
SELECT 
    Trip.TripId,
    DriverVehicleLinking.DriverId AS DriverUserId,
    UserBusinessLinking.BusinessId,
    UserDetail.FirstName,
    UserDetail.LastName,
    DriverVehicleLinking.VehicleId,
    Trip.PickUpTime,
    Trip.DropoffTime,
    Trip.IsCompleted,
    Trip.TripStatus,
    Trip.Date,
    Trip.PassengerId AS PassengerUserId,
	User.UserRole,
    Passenger.HomeAddress,
    Passenger.DestinationAddress,
	Passenger.FirstName AS PassengerFirstName,
    Passenger.LastName AS PassengerLastName
FROM
    Trip
        INNER JOIN    
    DriverVehicleLinking ON DriverVehicleLinking.DriverVehicleLinkingId = Trip.DriverVehicleLinkingId
        INNER JOIN
    User ON User.UserId = DriverVehicleLinking.DriverId
        INNER JOIN
    UserBusinessLinking ON UserBusinessLinking.UserId = DriverVehicleLinking.DriverId
        INNER JOIN
    UserDetail ON UserDetail.UserId = User.UserId
		INNER JOIN
    Passenger ON Passenger.PassengerId = Trip.PassengerId
WHERE
    UserBusinessLinking.BusinessId = _BusinessId
		AND Trip.Date > current_timestamp()
		AND Trip.IsCompleted = '0';
END