import { JwtPayload, jwtDecode } from "jwt-decode";
import { Session } from "./Session";
import { decode } from "base-64";
import { useStorageState } from "../Services/StorageStateService";
global.atob = decode;


export class Auth {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    GetSession() {
        let authToken: any = this.token
        let data: any = this.DecodeSessionToken(authToken);
        let session: Session = {
            UserRole: data.UserRole,
            UserId: data.UserId,
            Email: data.Email,
            BusinessId: data.BusinessId
        }
        return session;
    }
    GetAuth(authToken: string) {
        let auth = new Auth(authToken!.toString());
        return auth;
    }

    private DecodeSessionToken(sessionToken: string): JwtPayload {
        const session = jwtDecode(sessionToken);
        return session;
    }
}