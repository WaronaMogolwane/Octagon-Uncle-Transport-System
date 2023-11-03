export class User {
    userId?: string
    email?: string
    password?: string
    cellphone?: string
    status?: boolean
    lastLogin?: Date
    userRole?: Number

    constructor(
        userId?: string,
        email?: string,
        password?: string,
        cellphone?: string,
        status?: boolean,
        lastLogin?: Date,
        userRole?: Number) {
        this.userId = userId
        this.email = email
        this.password = password
        this.cellphone = cellphone
        this.status = status
        this.lastLogin = lastLogin
        this.userRole = userRole
    }
}