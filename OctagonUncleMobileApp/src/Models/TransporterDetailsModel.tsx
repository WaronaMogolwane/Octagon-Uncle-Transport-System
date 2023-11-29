export class Transporter {
    uid?: String;
    firstName?: String;
    lastName?: String;
    cellphone?: String;
    idNumber?: String;
    email?: String;
    role?: Number;
    addressLine1?: String;
    addressLine2?: String;
    suburb?: String;
    cityTown?: String;
    provinceState?: String;
    postalCode?: Number;

    constructor(
        uid?: String,
        firstName?: String,
        lastName?: String,
        cellphone?: String,
        idNumber?: String,
        email?: String,
        role?: Number,
        addressLine1?: String,
        addressLine2?: String,
        suburb?: String,
        cityTown?: String,
        provinceState?: String,
        postalCode?: Number
    ) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.idNumber = idNumber;
        this.email = email;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.suburb = suburb;
        this.cityTown = cityTown;
        this.provinceState = provinceState;
        this.postalCode = postalCode;
        this.role = role;
    }
}