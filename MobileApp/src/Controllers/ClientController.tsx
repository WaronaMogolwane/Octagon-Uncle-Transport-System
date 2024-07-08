import {
  AddClientToDatabase,
  GetAllClientFromDatabase,
  GetClientFromDatabase,
  DeleteClientFromDatabase,
  UpdateClientInDatabase,
} from '../Data/ClientDAL';
import {Client} from '../Models/Client';
import {GetInvitationsByBusinessIdUserRole} from '../Services/AuthenticationService';

export const AddClient = async (client: Client, uid: string) => {
  await AddClientToDatabase(client, uid);
};

export const GetClient = async (clientId: string) => {
  return await GetClientFromDatabase(clientId);
};

export const GetAllClients = async () => {
  return await GetAllClientFromDatabase();
};

export const DeleteClient = async (uid: string) => {
  return await DeleteClientFromDatabase(uid);
};

export const UpdateClient = async (client: Client, uid: string) => {
  await UpdateClientInDatabase(client, uid);
};

export const GetClientsInvitation = async (
  businessId: string,
  userRole: string,
  callback: (error: any, result: any) => void,
) => {
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
