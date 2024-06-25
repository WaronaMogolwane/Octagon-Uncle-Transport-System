import {
  AddVehicleToDatabase,
  GetVehicleAndDriverFromDB,
  GetVehiclesByBusinessId,
} from '../Data/VehicleDAL';
import {Vehicle} from '../Models/VehicleModel';

export const GetVehiclesAndDrivers = async (businessId: string) => {
  return await GetVehicleAndDriverFromDB(businessId);
};
export const AddNewVehicle = async (
  newVehicle: Vehicle,
  frontImage: string,
  rearImage: string,
  callback: (error: any, result: any) => void,
) => {
  await AddVehicleToDatabase(
    newVehicle,
    frontImage,
    rearImage,
    (error: any, result: any) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
};
export const GetVehicles = async (
  businessId: string,
  callback: (error: any, result: any) => void,
) => {
  await GetVehiclesByBusinessId(businessId, (error: any, result: any) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
};
