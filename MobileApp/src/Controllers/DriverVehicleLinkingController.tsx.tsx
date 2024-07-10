import {GetDriverIdFromDB} from '../Data/DriverVehicleLinkingDAL';

export const GetDriverId = async (vehicleId: string) => {
  return await GetDriverIdFromDB(vehicleId);
};
