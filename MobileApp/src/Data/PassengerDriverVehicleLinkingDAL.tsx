import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {PassengerDriverVehicleLinking} from '../Models/PassengerDriverVehicleLinkingModel';

export const InsertPassengerDriverVehicleLinkingToDB = async (
  pDVL: PassengerDriverVehicleLinking,
) => {
  let result: any;

  await axios
    .post(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-driver-vehicle-linking/add-passenger-driver-vehicle-link`,
      {
        params: {
          VehicleId: pDVL.VehicleId,
          BusinessId: pDVL.BusinessId,
          PassengerId: pDVL.PassengerId,
        },
      },
    )
    .then((response: any) => {
      result = response.status;
    })
    .catch((error: any) => {
      result = error;
    });

  return result;
};

export const GetPassengerDriverVehicleLinkingFromDB = async (
  businessId: string,
  dVLId: string,
) => {
  let result: any;
  let statusCode: any;
  let errorMessege: any;
  const pDVLData: {}[] = [];
  let pDVL = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-driver-vehicle-linking/get-passenger-driver-vehicle-link`,
      {
        params: {
          BusinessId: businessId,
          DVLId: dVLId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];
      statusCode = response.status;

      res.forEach(data => {
        pDVL = {
          pDVLId: data.PassengerDriverVehicleLinkingId,
          driverVehicleLinkingId: data.DriverVehicleLinkingId,
          passengerId: data.PassengerId,
          fullName: data.FirstName + ' ' + data.LastName,
          age: data.Age,
          pickUpLocation: data.HomeAddress,
          dropOffLocation: data.DestinationAddress,
        };

        pDVLData.push(pDVL);
      });

      result = pDVLData;
    })
    .catch((error: any) => {
      throw new Error(error);
      errorMessege = error;
    });

  return [result, statusCode, errorMessege];
};

export const RemovePassengerDriverLinkingFromDB = async (pDVLId: string) => {
  let result: any;
  await axios
    .delete(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-driver-vehicle-linking/delete-passenger-driver-vehicle-link`,
      {
        params: {
          PassengerDriverVehicleLinkingId: pDVLId,
        },
      },
    )
    .then((response: any) => {
      result = response.status;
    })
    .catch((error: any) => {
      result = error;
    });

  return result;
};
