export class Vehicle {
  LicenseNumber: string;
  Make: string;
  Model: string;
  Colour: string;
  EngineNumber: string;
  RegistratonNumber: string;
  Vin: string;
  Description: string;
  DriverFullName?: string;
  DateCreated: string;
  DateModified?: Date;
  constructor(
    LicenseNumber: string,
    Make: string,
    Model: string,
    Colour: string,
    EngineNumber: string,
    RegistratonNumber: string,
    Vin: string,
    Description: string,
    DateCreated: string,
    DateModified?: Date,
    DriverFullName?: string,
  ) {
    this.LicenseNumber = LicenseNumber;
    this.Make = Make;
    this.Model = Model;
    this.Colour = Colour;
    this.EngineNumber = EngineNumber;
    this.RegistratonNumber = RegistratonNumber;
    this.Vin = Vin;
    this.Description = Description;
    this.DriverFullName = DriverFullName;
    this.DateCreated = DateCreated;
    this.DateModified = DateModified;
  }
}
