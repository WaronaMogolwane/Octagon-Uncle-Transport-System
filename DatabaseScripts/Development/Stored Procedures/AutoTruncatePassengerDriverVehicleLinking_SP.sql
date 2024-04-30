CREATE DEFINER=`sqladmin`@`%` PROCEDURE `AutoTruncatePassengerDriverVehicleLinking`()
BEGIN
	TRUNCATE TABLE PassengerDriverVehicleLinking;
END