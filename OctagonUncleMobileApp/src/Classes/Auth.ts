import { JwtPayload, jwtDecode } from "jwt-decode";
import { Session } from "./Session";
import { decode } from "base-64";
import { useStorageState } from "../Services/StorageStateService";
global.atob = decode;

export class Auth {
    SessionToken: string;
    constructor(SessionToken: string) {
        this.SessionToken = SessionToken;
    }
    GetBusinessId = () => {
        let session: Session = this.GetSession();
        return session.BusinessId;
    }
    GetEmail = () => {
        let session: Session = this.GetSession();
        return session.Email;
    }
    GetUserId = () => {
        let session: Session = this.GetSession();
        return session.UserId;
    }
    GetUserRole = () => {
        let session: Session = this.GetSession();
        return session.UserRole;
    }

    private GetSession() {
        let data: any = this.DecodeSessionToken(this.SessionToken);
        let session: Session = {
            UserRole: data.UserRole,
            UserId: data.UserId,
            Email: data.Email,
            BusinessId: data.BusinessId
        }
        return session;
    }
    // GetAuth(authToken: string) {
    //     try {
    //         this.DecodeSessionToken(authToken)
    //         let auth = new Auth();
    //         return auth
    //     }
    //     catch (error) {
    //         console.error(error)
    //         return null;
    //     }
    // }
    // SetAuthentication(authToken: string, auth: Auth | null, setAuth: React.Dispatch<React.SetStateAction<Auth | null>>) {
    //     if (authToken !== null) {
    //         if (auth === null) {
    //             setAuth(new Auth().GetAuth(authToken));
    //         }
    //     }
    // }



    private DecodeSessionToken = (sessionToken: string): JwtPayload => {
        const session = jwtDecode(sessionToken);
        return session;
    }
}
