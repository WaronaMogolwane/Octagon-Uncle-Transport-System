CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeleteTempPassengerSchedule`(IN _PassengerId VARCHAR(100))
BEGIN
    DECLARE recordExists INT;

    -- Check if the record exists
    SELECT COUNT(*)
    INTO recordExists
    FROM TempPassengerSchedule
    WHERE PassengerId = _PassengerId;

   IF recordExists > 0 THEN
        -- If the record exists, delete from TempPassengerSchedule and call DeleteTrip
        DELETE FROM TempPassengerSchedule
        WHERE PassengerId = _PassengerId;
        
        CALL DeleteTrip(_PassengerId);
    END IF;

END