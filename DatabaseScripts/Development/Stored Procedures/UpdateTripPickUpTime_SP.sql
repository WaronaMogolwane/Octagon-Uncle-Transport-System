CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTripPickUpTime`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET PickUpTime = current_timestamp()
WHERE TripId = _TripId;
END