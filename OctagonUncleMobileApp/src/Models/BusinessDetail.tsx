export class BusinessDetail {
  businessDetailId: string;
  businessName: string;
  businessPhoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  businessId: string;

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
    businessId: string,
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
