export class Passenger {
  passenger_id?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  homeAddress?: string;
  destinationAddress?: string;
  parentId?: string;
  businessId?: string;

  constructor(
    passenger_id?: string,
    firstName?: string,
    lastName?: string,
    age?: string,
    homeaddress?: string,
    destinationaddress?: string,
    parentId?: string,
    businessId?: string
  ) {
    this.passenger_id = passenger_id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.homeAddress = homeaddress;
    this.destinationAddress = destinationaddress;
    this.parentId = parentId;
    this.businessId = businessId;
  }
}
