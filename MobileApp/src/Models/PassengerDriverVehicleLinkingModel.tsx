export class PassengerDriverVehicleLinking {
  VehicleId: String;
  BusinessId: String;
  PassengerId: String;
  IsActive?: Boolean;
  PassengerDriverVehicleLinkingId?: String;
  DriverVehicleLinkingId?: String;

  constructor(
    VehicleId: String,
    BusinessId: String,
    PassengerId: String,
    IsActive?: Boolean,
    PassengerDriverVehicleLinkingId?: String,
    DriverVehicleLinkingId?: String,
  ) {
    this.DriverVehicleLinkingId = DriverVehicleLinkingId;
    this.BusinessId = BusinessId;
    this.PassengerId = PassengerId;
    this.VehicleId = VehicleId;
    this.IsActive = IsActive;
    this.PassengerDriverVehicleLinkingId = PassengerDriverVehicleLinkingId;
  }
}
