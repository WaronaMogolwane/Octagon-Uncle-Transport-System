export class Passenger {
  PassengerId: string;
  FirstName: string;
  LastName: string;
  Age: Number;
  HomeAddress: string;
  Suburb: string;
  City: string;
  Province: string;
  PostalCode: string;
  DestinationAddress: string;
  ParentId: string;
  BusinessId: string;
  TripStatus?: string;
  PickUpTIme?: string;
  DropOffTime?: string;

  constructor(
    PassengerId: string,
    FirstName: string,
    LastName: string,
    Age: Number,
    HomeAddress: string,
    Suburb: string,
    City: string,
    Province: string,
    PostalCode: string,
    DestinationAddress: string,
    ParentId: string,
    BusinessId: string,
    TripStatus?: string,
    PickUpTIme?: string,
    DropOffTime?: string,
  ) {
    this.PassengerId = PassengerId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Age = Age;
    this.HomeAddress = HomeAddress;
    this.Suburb = Suburb;
    this.City = City;
    this.Province = Province;
    this.PostalCode = PostalCode;
    this.DestinationAddress = DestinationAddress;
    this.ParentId = ParentId;
    this.BusinessId = BusinessId;
    this.TripStatus = TripStatus;
    this.PickUpTIme = PickUpTIme;
    this.DropOffTime = DropOffTime;
  }
}
