export class BusinessDetail {
  businessDetailId: String;
  businessName: String;
  businessPhoneNumber: String;
  addressLine1: String;
  addressLine2: String;
  suburb: String;
  city: String;
  province: String;
  postalCode: String;
  businessId: String;

  constructor(
    businessDetailId: string,
    businessName: string,
    businessPhoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    suburb: string,
    city: string,
    province: string,
    postalCode: string,
    businessId: string
  ) {
    this.businessDetailId = businessDetailId;
    this.businessName = businessName;
    this.businessPhoneNumber = businessPhoneNumber;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.suburb = suburb;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.businessId = businessId;
  }
}
