import dotenv from "dotenv";
import { UserDetail } from "../Classes/UserDetail";
import { DbPool } from "../Services/DatabaseService";
dotenv.config();

// Generic database query function using promises
const executeQuery = async (query: string, values: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    DbPool.query({ sql: query, timeout: 40000, values }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Insert user detail
export const InsertUserDetail = async (userDetail: UserDetail): Promise<any> => {
  const query = "CALL InsertNewUserDetail(?,?,?,?,?,?,?,?,?,?,?);";
  const values = [
    userDetail.userDetailId,
    userDetail.firstName,
    userDetail.lastName,
    userDetail.phoneNumber,
    userDetail.addressLine1,
    userDetail.addressLine2,
    userDetail.suburb,
    userDetail.city,
    userDetail.province,
    userDetail.postalcode,
    userDetail.userId,
  ];
  return executeQuery(query, values);
};

// Get user detail by userId
export const GetUserDetailByUserId = async (userId: string): Promise<any> => {
  const query = "CALL GetUserDetail(?);";
  return executeQuery(query, [userId]);
};

// Get profile image by userId
export const GetUserDetailProfileImageByUserId = async (userId: string): Promise<any> => {
  const query = "CALL GetUserProfileImage(?);";
  return executeQuery(query, [userId]);
};

// Update user detail
export const UpdateUserDetail = async (userDetail: UserDetail): Promise<any> => {
  const query = "CALL UpdateUserDetail(?,?,?,?,?,?,?,?,?,?,?);";
  const values = [
    userDetail.userDetailId,
    userDetail.firstName,
    userDetail.lastName,
    userDetail.phoneNumber,
    userDetail.addressLine1,
    userDetail.addressLine2,
    userDetail.suburb,
    userDetail.city,
    userDetail.province,
    userDetail.postalcode,
    userDetail.userId,
  ];
  return executeQuery(query, values);
};

// Update profile image URL by userId
export const UpdateProfileImageUrlByUserId = async (user: any): Promise<any> => {
  const query = "CALL UpdateUserProfileImageUrl(?,?);";
  const values = [user.imagePath, user.userId];
  return executeQuery(query, values);
};

// Delete profile image URL by userId
export const DeleteProfileImageUrlByUserId = async (userId: string): Promise<any> => {
  const query = "CALL DeleteUserDetailImage(?);";
  return executeQuery(query, [userId]);
};
