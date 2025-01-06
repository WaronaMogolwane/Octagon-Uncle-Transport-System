CREATE DEFINER=`sqladmin`@`%` PROCEDURE `FailedTripUpdate`(IN _TripId INT)
BEGIN
	SET @_PassengerId = (SELECT PassengerId FROM Trip WHERE TripId = _TripId);

	UPDATE Trip
    SET TripStatus = '1',
		IsCompleted = '1'
	WHERE PassengerId = @_PassengerId
    AND Date = current_date()
    AND Leg = '1';
END