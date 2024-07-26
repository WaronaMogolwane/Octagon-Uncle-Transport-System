export class Customer {
    customerId: string;
    customerEmail: string;
    firstName: string;
    lastName: string;
    customerCode: string;
    domain: string;
    dateCreated: Date;
    dateUpdated: Date;
    userId: string;

    constructor(
        customerId: string,
        customerEmail: string,
        firstName: string,
        lastName: string,
        customerCode: string,
        domain: string,
        dateCreated: Date,
        dateUpdated: Date,
        userId: string
    ) {
        this.customerId = customerId;
        this.customerEmail = customerEmail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.customerCode = customerCode;
        this.domain = domain;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.userId = userId;
    }
}