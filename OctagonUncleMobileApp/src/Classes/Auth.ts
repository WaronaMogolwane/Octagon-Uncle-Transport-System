import { JwtPayload, jwtDecode } from "jwt-decode";
import { Session } from "./Session";
import { decode } from "base-64";
import { useStorageState } from "../Services/StorageStateService";
global.atob = decode;


export class Auth {

    constructor() {

    }

    GetSession(authToken: string) {
        let data: any = DecodeSessionToken(authToken);
        let session: Session = {
            UserRole: data.UserRole,
            UserId: data.UserId,
            Email: data.Email,
            BusinessId: data.BusinessId
        }
        return session;
    }
    GetAuth(authToken: string) {
        try {
            DecodeSessionToken(authToken)
            let auth = new Auth();
            return auth
        }
        catch (error) {
            console.error(error)
            return null;
        }
    }
    SetAuthentication(authToken: string, auth: Auth | null, setAuth: React.Dispatch<React.SetStateAction<Auth | null>>) {
        if (authToken !== null) {
            if (auth === null) {
                setAuth(new Auth().GetAuth(authToken));
            }
        }
    }
}

const DecodeSessionToken = (sessionToken: string): JwtPayload => {
    const session = jwtDecode(sessionToken);
    return session;
}

const GetBusinessId = (sessionToken: string) => {
    let data: any = DecodeSessionToken(sessionToken);
    let session: Session = {
        UserRole: data.UserRole,
        UserId: data.UserId,
        Email: data.Email,
        BusinessId: data.BusinessId
    }
    return session.BusinessId;

}
const GetEmail = (sessionToken: string) => {
    let data: any = DecodeSessionToken(sessionToken);
    let session: Session = {
        UserRole: data.UserRole,
        UserId: data.UserId,
        Email: data.Email,
        BusinessId: data.BusinessId
    }
    return session.Email;
}
const GetUserId = (sessionToken: string) => {
    let data: any = DecodeSessionToken(sessionToken);
    let session: Session = {
        UserRole: data.UserRole,
        UserId: data.UserId,
        Email: data.Email,
        BusinessId: data.BusinessId
    }
    return session.UserId;
}
const GetUserRole = (sessionToken: string) => {
    let data: any = DecodeSessionToken(sessionToken);
    let session: Session = {
        UserRole: data.UserRole,
        UserId: data.UserId,
        Email: data.Email,
        BusinessId: data.BusinessId
    }
    return session.UserRole;
}

export { GetBusinessId, GetEmail, GetUserId, GetUserRole }