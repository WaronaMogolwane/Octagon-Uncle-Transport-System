CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdatePassengerSchedule`(_Monday boolean, _Tuesday boolean, _Wednesday boolean, _Thursday boolean, _Friday boolean, _Saturday boolean, _Sunday boolean, _PassengerId varchar(100), _DriverId varchar(100))
BEGIN 
	SET @_DriverVehicleLinkingId = (SELECT DriverVehicleLinkingId FROM DriverVehicleLinking WHERE DriverId = _DriverId);
    
	Update  PassengerSchedule
    SET Monday = _Monday, Tuesday = _Tuesday, Wednesday = _Wednesday, Thursday = _Thursday, Friday = _Friday, Saturday = _Saturday, Sunday = _Sunday, DriverVehicleLinkingId = @_DriverVehicleLinkingId
    WHERE PassengerId =_PassengerId;
END