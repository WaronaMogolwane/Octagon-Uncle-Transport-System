export class Trip {
  tripId?: string;
  passengerId?: string;
  vehicleId?: string;
  businessId?: string;

  constructor(
    tripId?: string,
    passengerId?: string,
    vehicleId?: string,
    businessId?: string,
  ) {
    this.tripId = tripId;
    this.passengerId = passengerId;
    this.vehicleId = vehicleId;
    this.businessId = businessId;
  }
}
