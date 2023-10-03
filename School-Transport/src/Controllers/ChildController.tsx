import {
  AddChildToDatabase,
  GetChildDetailsFromDatabase,
  GetAllChildrenFromDatabase,
  deleteChildFromDatabase,
} from "../Data/ChildDAL";
import { Child } from "../Models/Child";

export const AddChild = async (ChildDetails: Child) => {
  await AddChildToDatabase(ChildDetails);
};

export const GetChild = async () => {
  return await GetChildDetailsFromDatabase();
};

export const GetAllChild = async () => {
  return await GetAllChildrenFromDatabase();
};

export const deleteChild = async (id: String) => {
  return await deleteChildFromDatabase(id);
};
