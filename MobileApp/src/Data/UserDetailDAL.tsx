import {UserDetail} from '../Models/UserDetail';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {SERVER_HOST, SERVER_PORT} from '@env';

export const AddUserDetailsToDB = async (userDetail: UserDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/user-profile/add-user-details`, {
      userDetail: {
        FirstName: userDetail.firstName,
        LastName: userDetail.lastName,
        PhoneNumber: userDetail.phoneNumber,
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
      statusCode = response.status;
      //data = response.data;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return statusCode;
};

export const GetUserDetailsFromDB = async (userId: string) => {
  let res: any;
  let statusCode: any;

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/user-profile/get-user-details`, {
      params: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let userDetail = new UserDetail(
        result[0].UserDetailId,
        result[0].FirstName,
        result[0].LastName,
        result[0].Cellphone,
        result[0].AddressLine1,
        result[0].AddressLine2,
        result[0].Suburb,
        result[0].City,
        result[0].Province,
        result[0].PostalCode,
        result[0].UserId,
      );

      res = userDetail;
      statusCode = response.status;
    })
    .catch(error => {
      console.error(error);
      res = error;
    });

  return [res, statusCode];
};

export const GetUserProfileImageFromDB = async (userId: string) => {
  let res: any;
  let statusCode: any;

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/user-profile/get-user-profile-image`, {
      params: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      res = result[0].ProfileImageUrl;
      statusCode = response.status;
    })
    .catch(error => {
      console.error(error);
      res = error;
    });

  return [res, statusCode];
};

export const UpdateUserDetailsInDB = async (userDetails: UserDetail) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/user-profile/update-user-details`, {
      userDetail: {
        UserDetailId: userDetails.userDetailId,
        FirstName: userDetails.firstName,
        LastName: userDetails.lastName,
        Cellphone: userDetails.phoneNumber,
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

export const UpdateProfileImageUrlInDB = async (
  userId: string,
  profileUrl: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(
      `${SERVER_HOST}:${SERVER_PORT}/user-profile/update-user-detail-profile-url`,
      {
        params: {
          ProfileImageUrl: profileUrl,
          UserId: userId,
          FileType: 'image/jpeg',
        },
      },
    )
    .then((response: AxiosResponse) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return [data, statusCode];
};

export const DeleteProfileImageUrlInDB = async (userId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(
      `${SERVER_HOST}:${SERVER_PORT}/user-profile/delete-user-detail-profile-url`,
      {
        params: {
          UserId: userId,
        },
      },
    )
    .then((response: AxiosResponse) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return [data, statusCode];
};

// export const GetAllUserDetailsFromDatabase = async () => {};

// export const DeleteUserDetailsFromDatabase = async (uid: string) => {};
