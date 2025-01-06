CREATE DEFINER=`sqladmin`@`%` PROCEDURE `AutoInsertNewTrips`()
BEGIN
	SET @_Date = current_date();
    
INSERT INTO Trip (PassengerId, BusinessId, DriverId, Date, VehicleId, Leg)
    SELECT pDVL.PassengerId, pDVL.BusinessId, dVl.DriverId, @_Date, dVl.VehicleId, '1'
    FROM PassengerDriverVehicleLinking AS pDVL
		INNER JOIN
	DriverVehicleLinking as dVl ON dVl.DriverVehicleLinkingId = pDVL.DriverVehicleLinkingId
    WHERE pDVL.IsActive = '1';
    
INSERT INTO Trip (PassengerId, BusinessId, DriverId, Date, VehicleId, Leg)
    SELECT pDVL.PassengerId, pDVL.BusinessId, dVl.DriverId, @_Date, dVl.VehicleId, '0'
    FROM PassengerDriverVehicleLinking AS pDVL
		INNER JOIN
	DriverVehicleLinking as dVl ON dVl.DriverVehicleLinkingId = pDVL.DriverVehicleLinkingId
    WHERE pDVL.IsActive = '1';
END