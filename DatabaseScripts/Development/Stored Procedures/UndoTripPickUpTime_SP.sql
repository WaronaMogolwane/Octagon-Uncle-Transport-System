CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UndoTripPickUpTime`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET PickUpTime = null,
	 TripStatus = 0
WHERE TripId = _TripId;
END