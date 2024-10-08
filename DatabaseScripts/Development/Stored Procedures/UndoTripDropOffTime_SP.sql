CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UndoTripDropOffTime`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET DropoffTime = null,
	 IsCompleted = 0,
	 TripStatus = 2
WHERE TripId = _TripId;
END