import {
  AddBusinessDetailToDB,
  GetBusinessDetailForParentFromDB,
  GetBusinessDetailFromDB,
  UpdateBusinessDetailInDB,
} from '../Data/BusinessDetailDAL';
import {BusinessDetail} from '../Models/BusinessDetail';

export const AddBusinessDetail = async (businessDetail: BusinessDetail) => {
  return await AddBusinessDetailToDB(businessDetail);
};

export const GetBusinessDetail = async (businessId: string) => {
  return await GetBusinessDetailFromDB(businessId);
};

export const GetBusinessDetailForParent = async (businessId: string) => {
  return await GetBusinessDetailForParentFromDB(businessId);
};

export const UpdateBusinessDetail = async (businessDetail: BusinessDetail) => {
  return await UpdateBusinessDetailInDB(businessDetail);
};
