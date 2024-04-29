CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTrip`(in _TripId varchar(100), in _PassengerId varchar(100), in _DriverVehicleLinkingId varchar(100), in _Date timestamp, in _PickUpTime varchar(100), in _DropoffTime varchar(100), in _IsCompleted int, in _TripStatus varchar(100))
BEGIN
UPDATE Trip
 SET PassengerId = _PassengerId,
  	 DriverVehicleLinkingId = _DriverVehicleLinkingId,
  	 Date = _Date,
     PickUpTime = _PickUpTime,
  	 DropOffTime = _DropOffTime,
     IsCompleted = _IsCompleted,
     TripStatus = _TripStatus
WHERE TripId = _TripId;
END