import {SERVER_HOST, SERVER_PORT} from '@env';
import axios, {AxiosError} from 'axios';
import {BankingDetail} from '../Models/BankingDetail';

export const AddBankingDetailToDB = async (bankingDetail: BankingDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/banking-detail/add-banking-detail`, {
      bankingDetail: {
        BankName: bankingDetail.bankName,
        BranchNumber: bankingDetail.branchNumber,
        AccountName: bankingDetail.accountName,
        AccountNumber: bankingDetail.accountNumber,
        BusinessId: bankingDetail.businessId,
        PaystackBankId: bankingDetail.paystackBankId,
        PaystackBankCode: bankingDetail.paystackBankCode,
        RecipientCode: bankingDetail.recipientCode,
        AccountType: bankingDetail.accountType,
        DocumentType: bankingDetail.documentType,
        DocumentNumber: bankingDetail.documentNumber,
      },
    })
    .then((response: any) => {
      statusCode = response.status;
    })
    .catch((error: any) => {
      throw new Error(error);
    });
  return statusCode;
};

export const GetBankingDetailFromDB = async (businessId: string) => {
  let statusCode: any;
  let data: any;
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/banking-detail/get-banking-detail`, {
      params: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      statusCode = response.status;
      data = response.data;
    })
    .catch((error: any) => {
      throw new Error(error);
    });

  return [data, statusCode];
};

export const UpdateBankingDetailToDB = async (bankingDetail: BankingDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .patch(
      `${SERVER_HOST}:${SERVER_PORT}/banking-detail/update-banking-detail`,
      {
        bankingDetail: {
          BankingDetailId: bankingDetail.bankingDetailId,
          BankName: bankingDetail.bankName,
          BranchNumber: bankingDetail.branchNumber,
          AccountName: bankingDetail.accountName,
          AccountNumber: bankingDetail.accountNumber,
          BusinessId: bankingDetail.businessId,
          PaystackBankId: bankingDetail.paystackBankId,
          PaystackBankCode: bankingDetail.paystackBankCode,
          RecipientCode: bankingDetail.recipientCode,
        },
      },
    )
    .then((response: any) => {
      statusCode = response.status;
      data = response.data;
    })
    .catch((error: any) => {
      throw new Error(error);
    });

  return [data, statusCode];
};

//   export const GetBusinessDetailFromDB = async (businessId: string) => {
//     let res: any;

//     await axios
//       .get(`${SERVER_HOST}:${SERVER_PORT}/business-detail/get-business-detail`, {
//         params: {
//           BusinessId: businessId,
//         },
//       })
//       .then((response: any) => {
//         let result = response.data.result;

//         let businessDetail = new BusinessDetail(
//           result[0].BusinessDetailId,
//           result[0].BusinessName,
//           result[0].BusinessPhoneNumber,
//           result[0].AddressLine1,
//           result[0].AddressLine2,
//           result[0].Suburb,
//           result[0].City,
//           result[0].Province,
//           result[0].PostalCode,
//           result[0].BusinessId,
//         );

//         res = businessDetail;
//       })
//       .catch((error: any) => {
//         throw new Error(error);
//         res = error;
//       });
//     console.log(res);

//     return res;
//   };

//   export const GetBusinessDetailForParentFromDB = async (businessId: string) => {
//     let res: any;

//     await axios
//       .get(
//         `${SERVER_HOST}:${SERVER_PORT}/business-detail/get-business-detail-for-parent`,
//         {
//           params: {
//             BusinessId: businessId,
//           },
//         },
//       )
//       .then((response: any) => {
//         let result = response.data.result;

//         let businessDetail = {
//           name: `${result[0].FirstName} ${result[0].LastName}`,
//           businessName: result[0].BusinessName,
//           businessPhoneNumber: result[0].BusinessPhoneNumber,
//           email: result[0].Email,
//           address: `${result[0].AddressLine1}`,
//         };

//         res = businessDetail;
//       })
//       .catch((error: any) => {
//         throw new Error(error);
//         res = error;
//       });

//     return res;
//   };

//   export const UpdateBusinessDetailInDB = async (
//     businessDetail: BusinessDetail,
//   ) => {
//     let statusCode: any;
//     let data: any;

//     await axios
//       .patch(
//         `${SERVER_HOST}:${SERVER_PORT}/business-detail/update-business-detail`,
//         {
//           businessDetail: {
//             BusinessDetailId: businessDetail.businessDetailId,
//             BusinessName: businessDetail.businessName,
//             BusinessPhoneNumber: businessDetail.businessPhoneNumber,
//             AddressLine1: businessDetail.addressLine1,
//             AddressLine2: businessDetail.addressLine2,
//             Suburb: businessDetail.suburb,
//             City: businessDetail.city,
//             Province: businessDetail.province,
//             PostalCode: businessDetail.postalCode,
//             BusinessId: businessDetail.businessId,
//           },
//         },
//       )
//       .then((response: any) => {
//         data = response.data;
//         statusCode = response.status;
//       })
//       .catch((error: any) => {
//         throw new Error(error);
//       });

//     return [data, statusCode];
//   };

// export const GetActivePassengerForBusinessFromDB = async (
//   businessId: string,
// ) => {
//   let result: any;
//   const tripData: {}[] = [];
//   let passsengers = {};

//   await axios
//     .get(`${SERVER_HOST}:${SERVER_PORT}/passenger/get-business-passengers`, {
//       params: {
//         BusinessId: businessId,
//       },
//     })
//     .then((response: any) => {
//       let res = [...response.data.result];

//       res.forEach(data => {
//         passsengers = {
//           passengerId: data.PassengerId,
//           passengerName: `${data.FirstName} ${data.LastName} (${data.HomeAddress})`,
//           editedName: `${data.FirstName} ${data.LastName}`,
//           age: data.Age,
//           homeAddress: data.HomeAddress,
//           destinationAddress: data.DestinationAddress,
//           parentId: data.ParentId,
//         };

//         tripData.push(passsengers);
//       });

//       result = tripData;
//     })
//     .catch((error: any) => {
//       result = error;
//     });

//   return result;
// };

export const GetBankListFromDB = async () => {
  let result: any;
  const bankData: {}[] = [];
  let bank = {};

  let country = 'south africa';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.paystack.co/bank',
    headers: {
      Authorization: 'Bearer SECRET_KEY',
      Cookie:
        '__cf_bm=TzVObHdfrWTnoWRZvSD1t712PQiB5rqoZ5DOCtmUnd4-1721039644-1.0.1.1-jwVbcuElfLncbhWd_4SjiP2.sHO1DkhtdZfOWH.WwXQbfAivMNqmpST3F5hHoT.HkpOMeioAqPmn1yf3dolU8Q; sails.sid=s%3AmTGBPvr61zPxxUdxRn1E4HjYnIWvHk41.4z%2Be8O1V6C8mwwL4guR2wHxf1cKN2ogAZ%2FO1TL3Lssg',
    },
    params: {country: country},
  };

  await axios
    .request(config)
    .then(response => {
      let res = [...response.data.data];

      res.forEach((data: any) => {
        bank = {
          id: data.id,
          name: data.name,
          code: data.code,
          longcode: data.longcode,
          gateway: data.gateway,
          pay_with_bank: data.pay_with_bank,
          supports_transfer: data.supports_transfer,
          active: data.active,
          country: data.country,
          currency: data.currency,
          type: data.type,
          is_deleted: data.is_deleted,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };

        bankData.push(bank);
      });

      result = bankData;
    })
    .catch(error => {
      throw new Error(error);
    });

  return result;
};

export const VerifyBankAccountInServer = async (
  accountNumber: BankingDetail,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/business-detail/verify-account-number`,
      {
        params: {
          AccountNumber: accountNumber.accountNumber,
          AccountName: accountNumber.accountName,
          BankCode: accountNumber.branchNumber,
          CountryCode: accountNumber?.paystackBankCode,
          DocumentType: accountNumber?.documentType,
          DocumentNumber: accountNumber?.documentNumber,
        },
      },
    )
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch(error => {
      throw new Error(error);
    });

  return [data, statusCode];
};
