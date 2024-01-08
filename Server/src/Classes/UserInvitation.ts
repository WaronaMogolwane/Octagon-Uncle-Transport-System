export class UserInvitation {
    businessId: string
    invitationCode: string
    firstName: string
    lastName: string
    userEmail: string
    userRole: string

    constructor(
        businessId: string,
        invitationCode: string,
        firstName: string,
        lastName: string,
        userEmail: string,
        userRole: string
    ) {
        this.businessId = businessId,
            this.invitationCode = invitationCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
        this.userRole = userRole;
    }
}