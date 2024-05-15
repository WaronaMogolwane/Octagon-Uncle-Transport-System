import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {Passenger} from '../Models/Passenger';
import {SplitTimeString, ConvertDate} from '../Services/DataConverterService';

export const AddPassengerToDatabase = async (passenger: Passenger) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/passenger/add-passenger`, {
      passenger: {
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Age: passenger.Age,
        HomeAddress: passenger.HomeAddress,
        DestinationAddress: passenger.DestinationAddress,
        ParentId: passenger.ParentId,
        BusinessId: passenger.BusinessId,
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

export const GetPassengerFromDatabase = async (
  passengerId: string,
  uid: string,
) => {};

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

export const GetParentPassengersFromDB = async (parentId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let passenger = {};

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/passenger/get-client-passengers`, {
      params: {
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        passenger = {
          passengerId: data.PassengerId,
          firstName: data.FirstName,
          lastName: data.LastName,
          age: data.Age.toString(),
          homeAddress: data.HomeAddress,
          destinationAddress: data.DestinationAddress,
          isActive: data.IsActive,
          isActiveText: data.IsActive == 1 ? 'Active' : 'Not Active',
        };

        tripData.push(passenger);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const DeletePassengerFromDatabase = async (
  passengerId: string,
  uid: string,
) => {};

export const UpdatePassengerInDatabase = async (passenger: Passenger) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/passenger/update-passenger-details`, {
      params: {
        PassengerId: passenger.PassengerId,
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Age: passenger.Age,
        HomeAddress: passenger.HomeAddress,
        DestinationAddress: passenger.DestinationAddress,
        ParentId: passenger.ParentId,
        BusinessId: passenger.BusinessId,
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
