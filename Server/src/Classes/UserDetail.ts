export class UserDetail {
  userDetailId?: string;
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  suburb?: string;
  city?: string;
  province?: string;
  postalcode?: string;
  userId?: string;

  constructor(
    userDetailId?: string,
    firstName?: string,
    lastName?: string,
    addressLine1?: string,
    addressLine2?: string,
    suburb?: string,
    city?: string,
    province?: string,
    postalcode?: string,
    userId?: string
  ) {
    this.userDetailId = userDetailId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.city = city;
    this.province = province;
    this.postalcode = postalcode;
    this.userId = userId;
  }
}
