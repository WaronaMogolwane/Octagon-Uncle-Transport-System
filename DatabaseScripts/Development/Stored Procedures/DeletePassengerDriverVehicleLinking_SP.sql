CREATE DEFINER=`sqladmin`@`%` PROCEDURE `DeletePassengerDriverVehicleLinking`(_PassengerDriverVehicleLinkingId varchar(100))
BEGIN
	SET @_PassengerId = (SELECT PassengerId FROM PassengerDriverVehicleLinking WHERE PassengerDriverVehicleLinkingId = _PassengerDriverVehicleLinkingId);

	CALL UpdatePassengerIsAssignedFalse(@_PassengerId);
    
    CALL DeletePassengerSchedule(@_PassengerId);
    
	DELETE 
    FROM PassengerDriverVehicleLinking
    WHERE PassengerDriverVehicleLinkingId = _PassengerDriverVehicleLinkingId;
END