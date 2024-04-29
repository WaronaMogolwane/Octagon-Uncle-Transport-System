import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {Passenger} from '../Models/Passenger';
import {SplitTimeString, ConvertDate} from '../Services/DataConverterService';

export const AddPassengerToDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string,
) => {};

export const GetPassengerFromDatabase = async (
  passengerId: string,
  uid: string,
) => {};

export const GetAllPassengerFromDatabase = async (uid: string) => {};

export const GetAllPassengerForBusinessFromDB = async (businessId: string) => {
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
          passengerName: `${data.FirstName} ${data.LastName} (${data.Age})`,
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

export const DeletePassengerFromDatabase = async (
  passengerId: string,
  uid: string,
) => {};

export const UpdatePassengerInDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string,
) => {};

export const UpdateIsAssignedInDB = async (passengerId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/passenger/update-is-assigned`, {
      params: {
        PassengerId: passengerId,
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
