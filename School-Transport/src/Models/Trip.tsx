export class Trip {
  tripId?: string;
  registrationNumber?: string;
  passenger?: any[];
  vehicleId?: string;
  businesId?: string;
  driverId?: string;
  date?: Date;
  time?: string;

  constructor(
    tripId?: string,
    registrationNumber?: string,
    passenger?: any[],
    vehicleId?: string,
    businesId?: string,
    driverId?: string,
    date?: Date,
    time?: string
  ) {
    this.tripId = tripId;
    this.registrationNumber = registrationNumber;
    this.passenger = passenger;
    this.vehicleId = vehicleId;
    this.businesId = businesId;
    this.driverId = driverId;
    this.date = date;
    this.time = time;
  }
}
