export class Passenger {
  PassengerId: String;
  FirstName: String;
  LastName: String;
  Age: Number;
  HomeAddress: String;
  DestinationAddress: String;
  ParentId: String;
  BusinessId: String;
  TripStatus?: String;

  constructor(
    PassengerId: String,
    FirstName: String,
    LastName: String,
    Age: Number,
    HomeAddress: String,
    DestinationAddress: String,
    ParentId: String,
    BusinessId: String,
    TripStatus?: String,
  ) {
    this.PassengerId = PassengerId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Age = Age;
    this.HomeAddress = HomeAddress;
    this.DestinationAddress = DestinationAddress;
    this.ParentId = ParentId;
    this.BusinessId = BusinessId;
    this.TripStatus = TripStatus;
  }
}
