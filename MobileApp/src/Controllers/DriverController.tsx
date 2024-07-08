import { GetInvitationsByBusinessIdUserRole } from "../Services/AuthenticationService";

export const GetDriverInvitation = async (businessId: string, userRole: string, callback: (error: any, result: any) => void,) => {
    await GetInvitationsByBusinessIdUserRole(
        businessId,
        userRole,
        (error: any, result: any) => {
            if (error) {
                callback(error.response.data, null);
            } else {
                callback(null, result.data);
            }
        },
    );
};
