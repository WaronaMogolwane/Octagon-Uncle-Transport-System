CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UndoTripEnd`(in _TripId varchar(100))
BEGIN
    DECLARE _PassengerId VARCHAR(100);
    DECLARE _Leg INT;

SELECT 
    PassengerId, Leg
INTO _PassengerId , _Leg FROM
    Trip
WHERE
    TripId = _TripId;

    IF _Leg = 0 THEN
        UPDATE Trip
        SET TripStatus = 0,
            IsCompleted = 0
        WHERE PassengerId = _PassengerId
        AND Date = CURRENT_DATE();
    ELSE
        UPDATE Trip 
        SET TripStatus = 0,
            IsCompleted = 0
        WHERE TripId = _TripId;
    END IF;
END