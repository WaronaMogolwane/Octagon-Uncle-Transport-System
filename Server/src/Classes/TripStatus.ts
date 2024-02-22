export class TripStatus {
  tripId?: string;
  tripStatus?: string;

  constructor(tripId?: string, tripStatus?: string) {
    this.tripId = tripId;
    this.tripStatus = tripStatus;
  }
}
