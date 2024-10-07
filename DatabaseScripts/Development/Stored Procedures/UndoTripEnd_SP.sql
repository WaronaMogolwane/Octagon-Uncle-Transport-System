sqladmin`@`%` PROCEDURE `UndoTripEnd`(in _TripId varchar(100))
BEGIN
UPDATE Trip
 SET TripStatus = 0
WHERE TripId = _TripId;
END