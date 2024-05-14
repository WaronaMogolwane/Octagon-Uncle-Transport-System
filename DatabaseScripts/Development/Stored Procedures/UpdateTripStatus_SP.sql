CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTripStatus`(in _TripId varchar(100), in _TripStatus varchar(100))
BEGIN
UPDATE Trip
 SET TripStatus = _TripStatus
WHERE TripId = _TripId;
END