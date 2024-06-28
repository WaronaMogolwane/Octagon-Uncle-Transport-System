export class Trip {
  tripId?: string;
  passengerId?: string;
  vehicleId?: string;

  constructor(tripId?: string, passengerId?: string, vehicleId?: string) {
    this.tripId = tripId;
    this.passengerId = passengerId;
    this.vehicleId = vehicleId;
  }
}
