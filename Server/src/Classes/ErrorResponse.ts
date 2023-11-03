export class ErrorResponse {
    status: number
    message: string

    constructor(
        status: number,
        meessage: string) {
        this.status = status,
            this.message = meessage;
    }
}