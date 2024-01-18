export class UserInvitationModel {
    invitationCode: string;
    userRole: string;
    constructor(
        invitationCode: string,
        userRole: string,
    ) {
        this.invitationCode = invitationCode;
        this.userRole = userRole;
    }
}
