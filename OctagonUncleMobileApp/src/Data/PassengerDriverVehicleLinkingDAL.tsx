import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {PassengerDriverVehicleLinking} from '../Models/PassengerDriverVehicleLinkingModel';

export const InsertPassengerDriverVehicleLinkingToDB = async (
  pDVL: PassengerDriverVehicleLinking,
) => {
  let result: any;

  await axios
    .post(
      `${SERVER_HOST}:${SERVER_PORT}/passengerDriverVehicleLinking/add-passenger-driver-vehicle-link`,
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
) => {
  let result: any;
  const pDVLData: {}[] = [];
  let pDVL = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passengerDriverVehicleLinking/get-passenger-driver-vehicle-link`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];

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
      console.log(error);
      result = error;
    });

  return result;
};

export const RemovePassengerDriverLinkingFromDB = async (pDVLId: string) => {
  let result: any;

  await axios
    .delete(
      `${SERVER_HOST}:${SERVER_PORT}/passengerDriverVehicleLinking/delete-passenger-driver-vehicle-link`,
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
