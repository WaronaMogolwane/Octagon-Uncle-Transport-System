import {
  AddParentToDatabase,
  GetAllParentsFromDatabase,
  GetParentFromDatabase,
  DeleteParentFromDatabase,
  UpdateParentInDatabase,
} from "../Data/ParentDAL";
import { Parent } from "../Models/Parent";

export const AddParent = async (parent: Parent) => {
  await AddParentToDatabase(parent);
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

export const UpdateParent = async (parent: Parent) => {
  await UpdateParentInDatabase(parent);
};
