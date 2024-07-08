export class UserDetail {
  userDetailId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  userId: string;

  constructor(
    userDetailId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    suburb: string,
    city: string,
    province: string,
    postalCode: string,
    userId: string,
  ) {
    this.userDetailId = userDetailId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.userId = userId;
  }
}
