CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerDriverVehicleLinking`(_PassengerDriverVehicleLinkingId varchar(100))
BEGIN

 DECLARE recordExists INT;
 
 SET @_PassengerId = (SELECT PassengerId FROM PassengerDriverVehicleLinking WHERE PassengerDriverVehicleLinkingId = _PassengerDriverVehicleLinkingId);

    -- Check if the record exists
SELECT 
    COUNT(*)
INTO recordExists FROM
    PassengerSchedule
WHERE
    PassengerId = @_PassengerId;
    
IF recordExists > 0 THEN
      CALL DeletePassengerSchedule(@_PassengerId);
ELSE
		 CALL DeleteTempPassengerSchedule(@_PassengerId);
END IF;
	
	CALL UpdatePassengerIsAssignedFalse(@_PassengerId);
    
	DELETE FROM PassengerDriverVehicleLinking 
WHERE
    PassengerDriverVehicleLinkingId = _PassengerDriverVehicleLinkingId;
END