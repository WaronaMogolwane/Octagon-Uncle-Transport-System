import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';

export const GetDriverIdFromDB = async (vehicleId: string) => {
  let result: any;
  let vehicle = {};
  const vehicleData: {}[] = [];

  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/driver-vehicle-linking/get-driver-id`, {
      params: {
        VehicleId: vehicleId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      result = res;
    })
    .catch((error: any) => {
      throw new Error(error);
      result = error;
    });

  return result;
};
