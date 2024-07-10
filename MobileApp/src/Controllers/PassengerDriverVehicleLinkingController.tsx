import {
  GetPassengerDriverVehicleLinkingFromDB,
  InsertPassengerDriverVehicleLinkingToDB,
  RemovePassengerDriverLinkingFromDB,
} from '../Data/PassengerDriverVehicleLinkingDAL';

import {PassengerDriverVehicleLinking} from '../Models/PassengerDriverVehicleLinkingModel';

export const AddPassengerDriverVehicleLinking = async (
  pDVL: PassengerDriverVehicleLinking,
) => {
  return await InsertPassengerDriverVehicleLinkingToDB(pDVL);
};

export const GetPassengerDriverVehicleLinking = async (businessId: string) => {
  return await GetPassengerDriverVehicleLinkingFromDB(businessId);
};

export const RemovePassengerDriverLinking = async (pDVLId: string) => {
  return await RemovePassengerDriverLinkingFromDB(pDVLId);
};
