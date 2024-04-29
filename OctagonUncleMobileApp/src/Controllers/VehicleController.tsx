import {GetVehicleAndDriverFromDB} from '../Data/VehicleDAL';

export const GetVehiclesAndDrivers = async (businessId: string) => {
  return await GetVehicleAndDriverFromDB(businessId);
};
