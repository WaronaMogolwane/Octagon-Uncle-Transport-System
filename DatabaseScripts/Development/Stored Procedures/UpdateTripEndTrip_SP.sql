CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTripEndTrip`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET IsCompleted = true
WHERE TripId = _TripId;
END