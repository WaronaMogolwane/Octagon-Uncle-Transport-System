export class Session {
    UserId: string;
    UserRole: string;
    Email: string;
    BusinessId: string;
    DateCreated: string;

    constructor(
        UserId: string,
        UserRole: string,
        Email: string,
        BusinessId: string,
        DateCreated: string,
    ) {
        this.UserId = UserId;
        this.UserRole = UserRole;
        this.Email = Email;
        this.BusinessId = BusinessId;
        this.DateCreated = DateCreated;
    }
}