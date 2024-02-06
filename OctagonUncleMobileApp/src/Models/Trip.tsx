export class Trip {
  tripId?: string;
  registrationNumber?: string;
  passenger?: any[];
  vehicleId?: string;
  businesId?: string;
  driverId?: string;
  date?: Date;
  time?: string;
  isCompleted?: boolean;

  constructor(
    tripId?: string,
    registrationNumber?: string,
    passenger?: any[],
    vehicleId?: string,
    businesId?: string,
    driverId?: string,
    date?: Date,
    time?: string,
    isCompleted?: boolean,
  ) {
    this.tripId = tripId;
    this.registrationNumber = registrationNumber;
    this.passenger = passenger;
    this.vehicleId = vehicleId;
    this.businesId = businesId;
    this.driverId = driverId;
    this.date = date;
    this.time = time;
    this.isCompleted = isCompleted;
  }
}
