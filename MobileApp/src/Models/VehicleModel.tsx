export class Vehicle {
  FrontImage?: string;
  RearImage?: string;
  LicenseNumber: string;
  Make: string;
  Model: string;
  Colour: string;
  EngineNumber: string;
  RegistrationNumber: string;
  Vin: string;
  BusinessId: string;
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
    BusinessId: string,
    Description: string,
    DateCreated: string,
    FrontImage?: string,
    RearImage?: string,

    DateModified?: Date,
    DriverFullName?: string,
  ) {
    this.FrontImage = FrontImage;
    this.RearImage = RearImage;
    this.LicenseNumber = LicenseNumber;
    this.Make = Make;
    this.Model = Model;
    this.Colour = Colour;
    this.EngineNumber = EngineNumber;
    this.RegistrationNumber = RegistratonNumber;
    this.Vin = Vin;
    this.BusinessId = BusinessId;
    this.Description = Description;
    this.DriverFullName = DriverFullName;
    this.DateCreated = DateCreated;
    this.DateModified = DateModified;
  }
}
