export class CurrentVehicle {
  dVLId: string;
  make: string;
  model: string;
  color: string;
  license: string;
  vehicleId: string;

  constructor(
    dVLId: string,
    make: string,
    model: string,
    color: string,
    license: string,
    vehicleId: string,
  ) {
    this.dVLId = dVLId;
    this.make = make;
    this.model = model;
    this.color = color;
    this.license = license;
    this.vehicleId = vehicleId;
  }
}
