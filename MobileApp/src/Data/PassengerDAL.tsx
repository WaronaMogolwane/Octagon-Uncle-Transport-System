import {SERVER_HOST, SERVER_PORT} from '@env';
import axios, {AxiosError} from 'axios';
import {Passenger} from '../Models/Passenger';
import {SplitTimeString, ConvertDate} from '../Services/DataConverterService';

export const AddPassengerToDB = async (passenger: Passenger) => {
  let statusCode: any;
  let data: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/passenger/add-passenger`, {
      passenger: {
        FirstName: passenger.FirstName,
        LastName: passenger.LastName,
        Age: passenger.Age,
        HomeAddress: passenger.HomeAddress,
        Suburb: passenger.Suburb,
        City: passenger.City,
        Province: passenger.Province,
        PostalCode: passenger.PostalCode,
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
      throw new Error(error);
    });

  [];

  return statusCode;
};

export const GetUnassignedPassengerForBusinessFromDB = async (
  businessId: string,
) => {
  let result: any;
  let status: any;
  let errorCode: any;
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
      status = response.status;

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
    .catch((error: AxiosError) => {
      errorCode = error;
    });

  return [result, status, errorCode];
};

export const GetActivePassengerForBusinessFromDB = async (
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let passsengers = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger/get-business-active-passengers`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
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

export const GetActivePassengerForParentFromDB = async (parentId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let passsengers = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger/get-active-parent-passengers`,
      {
        params: {
          ParentId: parentId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        passsengers = {
          passengerId: data.PassengerId,
          passengerName: `${data.FirstName} ${data.LastName} (${data.HomeAddress})`,
          firstName: data.FirstName,
          lastName: data.LastName,
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

export const GetAllPassengerForBusinessFromDB = async (businessId: string) => {
  let result: {}[] = [];
  const passengerData: {}[] = [];
  let passsengers = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger/get-all-passengers-for-business`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];
      res.forEach(data => {
        passsengers = {
          passengerId: data.PassengerId,
          passengerFirstName: data.PassengerFirstName,
          passengerLastName: data.PassengerLastName,
          passengerName: `${data.PassengerFirstName} ${data.PassengerLastName}`,
          age: data.Age,
          homeAddress: data.HomeAddress,
          suburb: data.Suburb,
          destinationAddress: data.DestinationAddress,
          isActive: data.IsActive,
          isActivetext: data.IsActive == 1 ? 'Active' : 'Not Active',
          isAssigned: data.IsAssigned,
          isDeleted: data.IsDeleted,
          parentId: data.ParentId,
          parentName: `${data.ParentFirstName} ${data.ParentLastName}`,
          userId: data.UserId,
        };

        passengerData.push(passsengers);
      });

      result = passengerData;
    })
    .catch((error: any) => {
      result = error;
    });

  return result;
};

export const GetPendingPassengerForBusinessFromDB = async (
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let passsengers = {};

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger/get-pending-passengers-for-business`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        passsengers = {
          passengerId: data.PassengerId,
          passengerFirstName: data.PassengerFirstName,
          passengerLastName: data.PassengerLastName,
          passengerName: `${data.PassengerFirstName} ${data.PassengerLastName}`,
          age: data.Age,
          homeAddress: data.HomeAddress,
          destinationAddress: data.DestinationAddress,
          isActive: data.IsActive,
          isActivetext: data.IsActive == 1 ? 'Active' : 'Not Active',
          isAssigned: data.IsAssigned,
          isDeleted: data.IsDeleted,
          parentId: data.ParentId,
          parentName: `${data.ParentFirstName} ${data.ParentLastName}`,
          userId: data.UserId,
          reason: data.Reason,
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
          isDeleted: data.IsDeleted,
        };

        tripData.push(passenger);
      });

      result = tripData;
    })
    .catch((error: any) => {
      throw new Error(error);
      result = error;
    });

  return result;
};

export const DeletePassengerFromDB = async (passengerId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .delete(`${SERVER_HOST}:${SERVER_PORT}/passenger/delete-passenger`, {
      params: {
        PassengerId: passengerId,
      },
    })
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: any) => {
      throw new Error(error);
    });

  return [data, statusCode];
};

export const DeletePassengerRequestFromDB = async (
  passengerId: string,
  reason: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .delete(
      `${SERVER_HOST}:${SERVER_PORT}/passenger/request-delete-passenger`,
      {
        params: {
          PassengerId: passengerId,
          Reason: reason,
        },
      },
    )
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: any) => {
      throw new Error(error);
    });

  return [data, statusCode];
};

export const UpdatePassengerInDB = async (passenger: Passenger) => {
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
        Suburb: passenger.Suburb,
        City: passenger.City,
        Province: passenger.Province,
        PostalCode: passenger.PostalCode,
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
      throw new Error(error);
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
      throw new Error(error);
    });

  return [data, statusCode];
};
