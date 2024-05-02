export class PassengerSchedule {
  passengerScheduleId: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  passengerId: string;
  vehicleId: string;

  constructor(
    passengerScheduleId: string,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    passengerId: string,
    vehicleId: string
  ) {
    this.passengerScheduleId = passengerScheduleId;
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
    this.passengerId = passengerId;
    this.vehicleId = vehicleId;
  }
}
