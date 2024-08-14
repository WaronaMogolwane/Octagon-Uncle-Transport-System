export class Customer {
    customerId: string;
    customerEmail: string;
    firstName: string;
    lastName: string;
    customerCode: string;
    domain: string;
    dateCreated: string;
    dateUpdated: string;
    userId: string;
    isActive: string;

    constructor(
        customerId: string,
        customerEmail: string,
        firstName: string,
        lastName: string,
        customerCode: string,
        domain: string,
        dateCreated: string,
        dateUpdated: string,
        userId: string,
        isActive: string
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
        this.isActive = isActive;
    }
}