export class Vehicle {
    ownerId: string;
    make: string;
    model: string;
    yearModel: string;
    registrationNo: string;
    vinNo: string;
    engineNo: string;
    licenceNo: string;
    colour: string;
    dateCreated: Date;
    dateModified: Date;

    constructor(
        ownerId: string,
        make: string,
        model: string,
        yearModel: string,
        registrationNo: string,
        vinNo: string,
        engineNo: string,
        licenceNo: string,
        colour: string,
        dateCreated: Date,
        dateModified: Date
    ) {
        this.ownerId = ownerId;
        this.make = make;
        this.model = model;
        this.yearModel = yearModel;
        this.registrationNo = registrationNo;
        this.vinNo = vinNo;
        this.engineNo = engineNo;
        this.licenceNo = licenceNo;
        this.colour = colour;
        this.dateCreated = dateCreated
        this.dateModified = dateModified
    }
}
