export class Passenger {
  passenger_id?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  homeAddress?: string;
  destinationAddress?: string;
  userId?: string;
  businessDetailId?: string;

  constructor(
    passenger_id?: string,
    firstName?: string,
    lastName?: string,
    age?: string,
    homeaddress?: string,
    destinationaddress?: string,
    userId?: string,
    businessDetailId?: string
  ) {
    this.passenger_id = passenger_id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.homeAddress = homeaddress;
    this.destinationAddress = destinationaddress;
    this.userId = userId;
    this.businessDetailId = businessDetailId;
  }
}
