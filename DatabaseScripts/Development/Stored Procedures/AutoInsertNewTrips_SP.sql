CREATE DEFINER=`sqladmin`@`%` PROCEDURE `AutoInsertNewTrips`()
BEGIN
	SET @_Date = current_timestamp();
	
    INSERT INTO Trip (PassengerId, DriverVehicleLinkingId, Date)
    SELECT PassengerId, DriverVehicleLinkingId, @_Date
    FROM PassengerDriverVehicleLinking
    WHERE IsActive = '1';
END