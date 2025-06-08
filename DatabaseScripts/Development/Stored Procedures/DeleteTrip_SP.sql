CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteTrip`(IN _PassengerId VARCHAR(100))
BEGIN
	DELETE 
    FROM Trip
    WHERE PassengerId = _PassengerId
    AND Date = current_date()
    AND TripStatus = '0'
    AND IsCompleted = '0';
END