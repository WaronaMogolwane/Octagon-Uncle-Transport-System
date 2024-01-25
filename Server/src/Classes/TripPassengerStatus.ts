export class TripPassengerStatus {
  tripId?: string;
  passenger?: any[];

  constructor(tripId?: string, passenger?: any[]) {
    this.tripId = tripId;
    this.passenger = passenger;
  }
}
