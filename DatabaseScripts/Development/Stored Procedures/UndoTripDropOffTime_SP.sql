CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UndoTripDropOffTime`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET DropoffTime = null,
	 TripStatus = 2
WHERE TripId = _TripId;
END