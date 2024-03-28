export class PassengerDriverVehicleLinking {
  passengerDriverVehicleLinking_id?: string;
  vehicle_Id?: string;
  business_Id?: string;
  passenger_Id?: string;

  constructor(
    passengerDriverVehicleLinking_id?: string,
    vehicle_Id?: string,
    business_Id?: string,
    passenger_Id?: string
  ) {
    this.passengerDriverVehicleLinking_id = passengerDriverVehicleLinking_id;
    this.vehicle_Id = vehicle_Id;
    this.business_Id = business_Id;
    this.passenger_Id = passenger_Id;
  }
}
