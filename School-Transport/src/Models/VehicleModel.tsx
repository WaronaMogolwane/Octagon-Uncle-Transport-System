export class Vehicle {
    ownerId: string;
    make: string;
    model: string;
    yearModel: string;
    registrationNo: string;
    vinNo: string;
    engineNo: string;
    licencePlate: string;
    colour: string;

    constructor(
        ownerId: string,
        make: string,
        model: string,
        yearModel: string,
        registrationNo: string,
        vinNo: string,
        engineNo: string,
        licencePlate: string,
        colour: string
    ) {
        this.ownerId = ownerId;
        this.make = make;
        this.model = model;
        this.yearModel = yearModel;
        this.registrationNo = registrationNo;
        this.vinNo = vinNo;
        this.engineNo = engineNo;
        this.licencePlate = licencePlate;
        this.colour = colour;
    }
}
