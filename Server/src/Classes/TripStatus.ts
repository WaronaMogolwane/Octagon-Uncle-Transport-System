export class TripStatus {
  tripId?: string;
  tripStatus?: number;

  constructor(tripId?: string, tripStatus?: number) {
    this.tripId = tripId;
    this.tripStatus = tripStatus;
  }
}
