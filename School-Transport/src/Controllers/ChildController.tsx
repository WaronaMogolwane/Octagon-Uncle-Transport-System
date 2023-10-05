import {
  AddChildToDatabase,
  GetChildFromDatabase,
  GetAllChildrenFromDatabase,
  DeleteChildFromDatabase,
  UpdateChildInDatabase,
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

export const DeleteChild = async (childId: string) => {
  return await DeleteChildFromDatabase(childId);
};

export const UpdateChild = async (child: Child) => {
  await UpdateChildInDatabase(child);
};
