export class CurrentVehicle {
  make: string;
  model: string;
  color: string;
  license: string;
  vehicleId: string;

  constructor(
    make: string,
    lastName: string,
    color: string,
    license: string,
    vehicleId: string,
  ) {
    this.make = make;
    this.model = lastName;
    this.color = color;
    this.license = license;
    this.vehicleId = vehicleId;
  }
}
