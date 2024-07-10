import { Client } from "../Models/Client";

export const AddClientToDatabase = async (
  clientDetails: Client,
  uid: string
) => {};

export const GetClientFromDatabase = async (uid: string) => {};

export const GetAllClientFromDatabase = async () => {};

export const DeleteClientFromDatabase = async (uid: string) => {};

export const UpdateClientInDatabase = async (client: Client, uid: string) => {};
