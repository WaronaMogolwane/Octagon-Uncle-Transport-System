import { randomUUID } from "crypto";
import { UserDetail } from "../Classes/UserDetail";
import {
  InsertUserDetail,
  GetUserDetailByUserId,
  UpdateUserDetail,
  UpdateProfileImageUrlByUserId,
  GetUserDetailProfileImageByUserId,
  DeleteProfileImageUrlByUserId,
} from "../Models/UserDetailsModel";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { UploadFile } from "../Services/BlobStorageService";

// Helper function for standard responses
const sendResponse = (res: any, status: number, message: string, result?: any) => {
  res.status(status).json({ message, result });
};

// Helper function for error responses
const handleError = (error: any, next: any, status: number, message: string) => {
  const err: Error = new Error(error.message || message);
  next(new ErrorResponse(status, err.message, err.stack));
};

export const AddUserDetail = async (req: any, res: any, next: any) => {
  try {
    const userDetail = req.body.userDetail;
    if (!userDetail) throw new Error("Invalid user detail structure");

    const newUserDetail = new UserDetail(
      randomUUID(),
      userDetail.FirstName,
      userDetail.LastName,
      userDetail.PhoneNumber,
      userDetail.AddressLine1,
      userDetail.AddressLine2,
      userDetail.Surburb,
      userDetail.City,
      userDetail.Province,
      userDetail.PostalCode,
      userDetail.UserId
    );

    const result = await InsertUserDetail(newUserDetail);
    if (result.affectedRows === 0) throw new Error("Insertion failed");

    sendResponse(res, 200, "User created successfully", result[0]);
  } catch (error: any) {
    handleError(error, next, 400, "Failed to add user detail");
  }
};

export const GetUserDetail = async (req: any, res: any, next: any) => {
  try {
    const userId = req.query.UserId;
    if (!userId) throw new Error("UserId is required");

    const result = await GetUserDetailByUserId(userId);
    if (result.affectedRows === 0) throw new Error("No user detail found");

    sendResponse(res, 200, "User detail retrieved successfully", result[0]);
  } catch (error: any) {
    handleError(error, next, 400, "Failed to retrieve user detail");
  }
};

export const GetUserProfileImage = async (req: any, res: any, next: any) => {
  try {
    const userId = req.query.UserId;
    if (!userId) throw new Error("UserId is required");

    const result = await GetUserDetailProfileImageByUserId(userId);
    if (result.affectedRows === 0) throw new Error("Profile image not found");

    sendResponse(res, 200, "Profile image retrieved successfully", result[0]);
  } catch (error: any) {
    handleError(error, next, 400, "Failed to retrieve profile image");
  }
};

export const UpdateUserPersonalDetail = async (req: any, res: any, next: any) => {
  try {
    const userDetail = req.body.userDetail;
    if (!userDetail || !userDetail.UserDetailId) throw new Error("Invalid user detail structure");

    const updatedUserDetail = new UserDetail(
      userDetail.UserDetailId,
      userDetail.FirstName,
      userDetail.LastName,
      userDetail.Cellphone,
      userDetail.AddressLine1,
      userDetail.AddressLine2,
      userDetail.Surburb,
      userDetail.City,
      userDetail.Province,
      userDetail.PostalCode,
      userDetail.UserId
    );

    const result = await UpdateUserDetail(updatedUserDetail);
    if (result.affectedRows === 0) throw new Error("Update failed");

    sendResponse(res, 200, "User detail updated successfully", result.affectedRows);
  } catch (error: any) {
    handleError(error, next, 400, "Failed to update user detail");
  }
};

export const UpdateProfileImageUrl = async (req: any, res: any, next: any) => {
  try {
    const { UserId, ProfileImageUrl, FileType } = req.body.params;
    if (!UserId || !ProfileImageUrl || !FileType) throw new Error("Invalid request structure");

    const filePath = `User-Files/${UserId}/User-Details/`;
    const profileImageName = `${filePath}Profile-Image.jpeg`;

    await UploadFile(ProfileImageUrl, profileImageName, FileType);

    const userDetail = { userId: UserId, imagePath: profileImageName };
    const result = await UpdateProfileImageUrlByUserId(userDetail);

    sendResponse(res, 200, "Profile image updated successfully", result);
  } catch (error: any) {
    handleError(error, next, 501, "Failed to update profile image URL");
  }
};

export const DeleteProfileImageUrl = async (req: any, res: any, next: any) => {
  try {
    const userId = req.body.params.UserId;
    if (!userId) throw new Error("UserId is required");

    const result = await DeleteProfileImageUrlByUserId(userId);

    sendResponse(res, 200, "Profile image deleted successfully", result);
  } catch (error: any) {
    handleError(error, next, 400, "Failed to delete profile image URL");
  }
};
