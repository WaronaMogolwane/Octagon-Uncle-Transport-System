export class Passenger {
  passenger_id?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  homeAddress?: string;
  destinationAddress?: string;
  payerId?: string;
  businessId?: string;

  constructor(
    passenger_id?: string,
    firstName?: string,
    lastName?: string,
    age?: string,
    homeaddress?: string,
    destinationaddress?: string,
    payerId?: string,
    businessId?: string
  ) {
    this.passenger_id = passenger_id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.homeAddress = homeaddress;
    this.destinationAddress = destinationaddress;
    this.payerId = payerId;
    this.businessId = businessId;
  }
}
