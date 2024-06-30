import {
  AddVehicleToDatabase,
  DeleteDriverVehicleLinkByDriverId,
  DeleteVehicleByDriverIdAndVehicleId,
  GetVehicleAndDriverFromDB,
  GetVehicleByLicenseNumberAndBusinessId,
  GetVehiclesByBusinessId,
  InsertNewDriverVehicleLink,
} from '../Data/VehicleDAL';
import {Vehicle} from '../Models/VehicleModel';

export const GetVehiclesAndDrivers = async (businessId: string) => {
  return await GetVehicleAndDriverFromDB(businessId);
};
export const AddNewDriverVehicleLink = async (
  driverId: string,
  vehicleLicenseNumber: string,
  vehicleId: string,
  callback: (error: any, result: any) => void,
) => {
  await InsertNewDriverVehicleLink(
    driverId,
    vehicleLicenseNumber,
    vehicleId,
    (error: any, result: any) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
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
export const DeleteDriverVehicleLink = async (
  driverId: string,
  callback: (error: any, result: any) => void,
) => {
  await DeleteDriverVehicleLinkByDriverId(
    driverId,
    (error: any, result: any) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
};
export const RemoveVehicle = async (
  driverId: string,
  vehicleId: number,
  callback: (error: any, result: any) => void,
) => {
  await DeleteVehicleByDriverIdAndVehicleId(
    driverId,
    vehicleId,
    (error: any, result: any) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
};
export const CheckIfVehicleExists = async (
  businessId: string,
  licenseNumber: string,
  callback: (error: any, result: any) => void,
) => {
  await GetVehicleByLicenseNumberAndBusinessId(
    businessId,
    licenseNumber,
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
