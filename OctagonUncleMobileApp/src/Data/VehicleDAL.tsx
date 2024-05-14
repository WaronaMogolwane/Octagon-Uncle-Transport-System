import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {Vehicle} from '../Models/VehicleModel';

export const AddVehicleToDatabase = async (
  vehicleDetails: Vehicle,
  transporterUid: string,
) => {
  let response;

  return response;
};

export const UpdateVehicleDetails = async (
  vehicleDetails: Vehicle,
  transporterUid: string,
) => {
  let response;
  return response;
};

export const GetAllVehiclesFromDatabase = async (transporterUid: string) => {
  let response;
  return response;
};

export const GetVehicleAndDriverFromDB = async (businessId: string) => {
  let result: any;
  let vehicle = {};
  const vehicleData: {}[] = [];

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/vehicle/get-vehicle-and-driver-for-business`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        vehicle = {
          vehicleId: data.VehicleId,
          registrationNumber: data.RegistrationNumber,
          make: data.Make,
          model: data.Model,
          color: data.Color,
          fullName: data.FirstName + ' ' + data.LastName,
        };

        vehicleData.push(vehicle);
      });

      result = vehicleData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};
