import { UserDetail } from "../Models/UserDetail";
import axios from "axios";

export const AddUserDetailsToDatabase = async (userDetail: UserDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .post("http://192.168.3.57:9999/user-profile/add-user-details", {
      userDetail: {
        FirstName: userDetail.firstName,
        LastName: userDetail.lastName,
        AddressLine1: userDetail.addressLine1,
        AddressLine2: userDetail.addressLine2,
        Surburb: userDetail.suburb,
        City: userDetail.city,
        Province: userDetail.province,
        PostalCode: userDetail.postalCode,
        UserId: userDetail.userId,
      },
    })
    .then((response: any) => {
      console.log(response.data, response.status);
    })
    .catch((error: any) => {
      console.log(error);
    });

  [];
};

export const GetUserDetailsFromDatabase = async (userId: string) => {
  let res: any;
  await axios
    .post("http://192.168.3.57:9999/user-profile/get-user-details", {
      userDetails: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let userDetail = new UserDetail(
        result.userDetail_id,
        result.firstname,
        result.lastname,
        result.addressline1,
        result.addressline2,
        result.suburb,
        result.city,
        result.province,
        result.postalcode,
        result.user_id
      );

      res = userDetail;
    })
    .catch((error) => {
      console.log(error);
      res = error;
    });
  return res;
};

export const UpdateUserDetailsInDatabase = async (userDetails: UserDetail) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch("http://192.168.3.57:9999/passenger/update-passenger-details", {
      userDetail: {
        UserDetailId: userDetails.userDetailId,
        FirstName: userDetails.firstName,
        LastName: userDetails.lastName,
        AddressLine1: userDetails.addressLine1,
        AddressLine2: userDetails.addressLine2,
        Surburb: userDetails.suburb,
        City: userDetails.city,
        Province: userDetails.province,
        PostalCode: userDetails.postalCode,
        UserId: userDetails.userId,
      },
    })
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return [data, statusCode];
};

// export const GetAllUserDetailsFromDatabase = async () => {};

// export const DeleteUserDetailsFromDatabase = async (uid: string) => {};
