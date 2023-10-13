export class Passenger {
  passengerId: String;
  firstName: String;
  lastName: String;
  sex: String;
  age: Number;

  constructor(
    childId: String,
    firstName: String,
    lastName: String,
    age: Number,
    sex: String
  ) {
    this.passengerId = childId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
  }
}
