export class BusinessDetails {
    businessName?: String;
    telephone?: String;
    email?: String;
    addressLine1?: String;
    addressLine2?: String;
    suburb?: String;
    cityTown?: String;
    provinceState?: String;
    postalCode?: Number;

    constructor(
        businessName?: String,
        telephone?: String,
        email?: String,
        addressLine1?: String,
        addressLine2?: String,
        suburb?: String,
        cityTown?: String,
        provinceState?: String,
        postalCode?: Number
        ) {
        this.businessName = businessName;
        this.telephone = telephone;
        this.email = email;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.suburb = suburb;
        this.cityTown = cityTown;
        this.provinceState = provinceState;
        this.postalCode = postalCode;
    }
}