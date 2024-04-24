export class PassengerDriverVehicleLinking {
  vehicle_Id?: string;
  business_Id?: string;
  passenger_Id?: string;
  passengerDriverVehicleLinking_id?: string;

  constructor(
    vehicle_Id?: string,
    business_Id?: string,
    passenger_Id?: string,
    passengerDriverVehicleLinking_id?: string
  ) {
    this.vehicle_Id = vehicle_Id;
    this.business_Id = business_Id;
    this.passenger_Id = passenger_Id;
    this.passengerDriverVehicleLinking_id = passengerDriverVehicleLinking_id;
  }
}
