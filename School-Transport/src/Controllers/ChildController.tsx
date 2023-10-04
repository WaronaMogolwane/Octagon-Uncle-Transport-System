import {
  AddChildToDatabase,
  GetChildFromDatabase,
  GetAllChildrenFromDatabase,
  deleteChildFromDatabase,
} from "../Data/ChildDAL";
import { Child } from "../Models/Child";

export const AddChild = async (child: Child) => {
  await AddChildToDatabase(child);
};

export const GetChild = async (childId: string) => {
  return await GetChildFromDatabase(childId);
};

export const GetAllChildren = async () => {
  return await GetAllChildrenFromDatabase();
};

export const deleteChild = async (childId: string) => {
  return await deleteChildFromDatabase(childId);
};
