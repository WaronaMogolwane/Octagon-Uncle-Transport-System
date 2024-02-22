export class User {
    userId: string
    email: string
    password: string
    status?: boolean
    lastLogin?: Date
    userRole: 1 | 2 | 3 | 10

    constructor(
        userId?: string,
        email?: string,
        password?: string,
        status?: boolean,
        lastLogin?: Date,
        userRole?: 1 | 2 | 3 | 10
    ) {
        this.userId = userId
        this.email = email
        this.password = password
        this.status = status
        this.lastLogin = lastLogin
        this.userRole = userRole
    }
}