import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';

export const GetUserFromDB = async (userId: string) => {
  let res: any;
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/user/get-user`, {
      params: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result[0];

      let user = {
        email: result.Email,
        password: result.Password,
        firstName: result.FirstName,
        lastName: result.LastName,
      };

      res = user;
    })
    .catch(error => {
      console.log(error);
      res = error;
    });
  return res;
};

export const UpdateUserEmailInDB = async (
  userId: string,
  email: string,
  name: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/user/update-user-email`, {
      user: {
        UserId: userId,
        Email: email,
        Name: name,
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

export const UpdateUserPasswordInDB = async (
  userId: string,
  newPassword: string,
  oldPassword: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/user/update-user-password`, {
      user: {
        UserId: userId,
        Password: newPassword,
        OldPassword: oldPassword,
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
