export class Trip {
  tripId?: string;
  passengerId?: string;
  driverVehicleLinkingId?: string;
  date?: Date;
  pickUpTime?: string;
  dropOffTime?: string;
  isCompleted?: boolean;
  tripStatus?: number;

  constructor(
    tripId?: string,
    passengerId?: string,
    driverVehicleLinkingId?: string,
    date?: Date,
    pickUpTime?: string,
    dropOffTime?: string,
    isCompleted?: boolean,
    tripStatus?: number
  ) {
    this.tripId = tripId;
    this.passengerId = passengerId;
    this.driverVehicleLinkingId = driverVehicleLinkingId;
    this.date = date;
    this.pickUpTime = pickUpTime;
    this.dropOffTime = dropOffTime;
    this.isCompleted = isCompleted;
    this.tripStatus = tripStatus;
  }
}
