import {
  AddParentToDatabase,
  GetAllParentsFromDatabase,
  GetParentFromDatabase,
  DeleteParentFromDatabase,
} from "../Data/ParentDAL";
import { Parent } from "../Models/Parent";

export const AddParent = async (parentDetails: Parent) => {
  await AddParentToDatabase(parentDetails);
};

export const GetParent = async () => {
  return await GetParentFromDatabase();
};

export const GetAllParents = async () => {
  return await GetAllParentsFromDatabase();
};

export const DeleteParent = async () => {
  return await DeleteParentFromDatabase();
};
