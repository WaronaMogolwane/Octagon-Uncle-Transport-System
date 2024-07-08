export class Client {
  firstName: String;
  lastName: String;
  cellphone: String;
  idNumber: String;
  email: String;
  role: Number;
  addressLine1: String;
  addressLine2: String;
  suburb: String;
  cityTown: String;
  provinceState: String;
  postalCode: String;
  transporterId: String;

  constructor(
    firstName: string,
    lastName: string,
    cellphone: string,
    idNumber: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    suburb: string,
    cityTown: string,
    provinceState: string,
    postalCode: string,
    role: Number,
    transporterId: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cellphone = cellphone;
    this.idNumber = idNumber;
    this.email = email;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.cityTown = cityTown;
    this.provinceState = provinceState;
    this.postalCode = postalCode;
    this.role = role;
    this.transporterId = transporterId;
  }
}
