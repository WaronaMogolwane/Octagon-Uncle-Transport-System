export class Passenger {
  passenger_id?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  homeaddress?: string;
  destinationaddress?: string;
  userId?: string;

  constructor(
    passenger_id?: string,
    firstName?: string,
    lastName?: string,
    age?: string,
    homeaddress?: string,
    destinationaddress?: string,
    userId?: string
  ) {
    this.passenger_id = passenger_id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.homeaddress = homeaddress;
    this.destinationaddress = destinationaddress;
    this.userId = userId;
  }
}
