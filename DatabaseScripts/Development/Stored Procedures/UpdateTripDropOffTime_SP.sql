CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTripDropOffTime`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET DropoffTime = current_timestamp()
WHERE TripId = _TripId;
END