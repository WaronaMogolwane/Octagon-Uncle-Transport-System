import {
  AddClientToDatabase,
  GetAllClientFromDatabase,
  GetClientFromDatabase,
  DeleteClientFromDatabase,
  UpdateClientInDatabase,
} from "../Data/ClientDAL";
import { Client } from "../Models/Client";

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
