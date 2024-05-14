CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewPassengerSchedule`(_Monday boolean, _Tuesday boolean, _Wednesday boolean, _Thursday boolean, _Friday boolean, _Saturday boolean, _Sunday boolean, _PassengerId varchar(100), _DriverId varchar(100))
BEGIN
	SET @_DriverVehicleLinkingId = (SELECT DriverVehicleLinkingId FROM DriverVehicleLinking WHERE DriverId = _DriverId);
    
	INSERT  
    INTO PassengerSchedule
    (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, PassengerId, DriverVehicleLinkingId)
    VALUES
    (_Monday, _Tuesday, _Wednesday, _Thursday, _Friday, _Saturday, _Sunday, _PassengerId,  @_DriverVehicleLinkingId);
END