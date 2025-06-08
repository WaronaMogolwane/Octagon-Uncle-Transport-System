CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdateTripStatus`(in _TripId varchar(100), in _TripStatus varchar(100))
BEGIN
	IF _TripStatus = '1'
THEN 
	CALL FailedTripUpdate(_TripId);
END IF;

UPDATE Trip 
SET 
    TripStatus = _TripStatus
WHERE
    TripId = _TripId;

END