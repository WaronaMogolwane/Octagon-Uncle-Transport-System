import {SERVER_HOST, SERVER_PORT} from '@env';
import {BusinessDetail} from '../Models/BusinessDetail';
import axios from 'axios';

export const AddBusinessDetailToDB = async (businessDetail: BusinessDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/business-detail/add-business-detail`, {
      businessDetail: {
        BusinessName: businessDetail.businessName,
        BusinessPhoneNumber: businessDetail.businessPhoneNumber,
        AddressLine1: businessDetail.addressLine1,
        AddressLine2: businessDetail.addressLine2,
        Suburb: businessDetail.suburb,
        City: businessDetail.city,
        Province: businessDetail.province,
        PostalCode: businessDetail.postalCode,
        BusinessId: businessDetail.businessId,
      },
    })
    .then((response: any) => {
      statusCode = response.status;
      //data = response.data;
    })
    .catch((error: any) => {
      console.log(error);
    });

  [];

  return statusCode;
};

export const GetBusinessDetailFromDB = async (businessId: string) => {
  let res: any;

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/business-detail/get-business-detail`, {
      params: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let businessDetail = new BusinessDetail(
        result[0].BusinessDetailId,
        result[0].BusinessName,
        result[0].BusinessPhoneNumber,
        result[0].AddressLine1,
        result[0].AddressLine2,
        result[0].Suburb,
        result[0].City,
        result[0].Province,
        result[0].PostalCode,
        result[0].BusinessId,
      );

      res = businessDetail;
    })
    .catch((error: any) => {
      console.log(error);
      res = error;
    });
  console.log(res);

  return res;
};

export const GetBusinessDetailForParentFromDB = async (businessId: string) => {
  let res: any;

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/business-detail/get-business-detail-for-parent`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let result = response.data.result;

      let businessDetail = {
        name: `${result[0].FirstName} ${result[0].LastName}`,
        businessName: result[0].BusinessName,
        businessPhoneNumber: result[0].BusinessPhoneNumber,
        email: result[0].Email,
        address: `${result[0].AddressLine1}`,
      };

      res = businessDetail;
    })
    .catch((error: any) => {
      console.log(error);
      res = error;
    });

  return res;
};

export const UpdateBusinessDetailInDB = async (
  businessDetail: BusinessDetail,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(
      `${SERVER_HOST}:${SERVER_PORT}/business-detail/update-business-detail`,
      {
        businessDetail: {
          BusinessDetailId: businessDetail.businessDetailId,
          BusinessName: businessDetail.businessName,
          BusinessPhoneNumber: businessDetail.businessPhoneNumber,
          AddressLine1: businessDetail.addressLine1,
          AddressLine2: businessDetail.addressLine2,
          Suburb: businessDetail.suburb,
          City: businessDetail.city,
          Province: businessDetail.province,
          PostalCode: businessDetail.postalCode,
          BusinessId: businessDetail.businessId,
        },
      },
    )
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return [data, statusCode];
};
