import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
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
        BankId: bankingDetail.paystackId,
        BankCode: bankingDetail.payStackCode,
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

export const UpdateBankingDetailToDB = async (bankingDetail: BankingDetail) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(
      `${SERVER_HOST}:${SERVER_PORT}/banking-detail/update-banking-detail`,
      {
        businessDetail: {
          BankingDetailId: bankingDetail.bankingDetailId,
          BankName: bankingDetail.bankName,
          BranchNumber: bankingDetail.branchNumber,
          AccountName: bankingDetail.accountName,
          AccountNumber: bankingDetail.accountNumber,
          BusinessId: bankingDetail.businessId,
        },
      },
    )
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
//         console.log(error);
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
//         console.log(error);
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
//         console.log(error);
//       });

//     return [data, statusCode];
//   };

export const GetActivePassengerForBusinessFromDB = async (
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let passsengers = {};

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/passenger/get-business-passengers`, {
      params: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        passsengers = {
          passengerId: data.PassengerId,
          passengerName: `${data.FirstName} ${data.LastName} (${data.HomeAddress})`,
          editedName: `${data.FirstName} ${data.LastName}`,
          age: data.Age,
          homeAddress: data.HomeAddress,
          destinationAddress: data.DestinationAddress,
          parentId: data.ParentId,
        };

        tripData.push(passsengers);
      });

      result = tripData;
    })
    .catch((error: any) => {
      result = error;
    });

  return result;
};

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
          bankName: data.name,
          bankId: data.id,
          bankCode: data.code,
        };

        bankData.push(bank);
      });

      result = bankData;
    })
    .catch(error => {
      console.log(error);
    });

  return result;
};

export const ValidateAccountInDB = async (accountDetails: any) => {
  let result: any;

  let data = JSON.stringify({
    bank_code: accountDetails.bank_code,
    country_code: accountDetails.country_code,
    account_number: accountDetails.account_number,
    account_name: accountDetails.account_name,
    account_type: accountDetails.account_type,
    document_type: accountDetails.document_type,
    document_number: accountDetails.document_number,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.paystack.co:443/bank/validate',
    headers: {
      Authorization: 'Bearer sk_test_15b32363d5ec93adf4cb35693b162ac7f87d4224',
      'Content-Type': 'application/json',
      Cookie:
        '__cf_bm=uKNDRLKGjFMsbiS1F4.mM1iIVdgVB1r4oaulgB52bk8-1721108570-1.0.1.1-i9c1iJtg0yUmoOKS5xx0Q_.vntHWO87eCxlhWJrG_p1Ljav4UuSidWhDeo4spc7uC4tSLEI8pd1H4mfEWkaGjg; sails.sid=s%3AsYAJxuXxwglwNuJaFbox0wvPt8h8xFj2.ELrPbh6xcuiTp1X22%2FXs1K%2BhY5%2Bkofee%2BX%2BcVPMNU0w',
    },
    data: data,
  };

  await axios
    .request(config)
    .then(response => {
      let res = response.data.data.verified;

      result = JSON.stringify(res);
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
