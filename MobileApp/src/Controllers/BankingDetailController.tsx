import {
  AddBankingDetailToDB,
  UpdateBankingDetailToDB,
} from '../Data/BankingDetailDAL';
import {BankingDetail} from '../Models/BankingDetail';

export const AddBankingDetail = async (bankingDetail: BankingDetail) => {
  return await AddBankingDetailToDB(bankingDetail);
};

export const UpdateBusinessDetail = async (bankingDetail: BankingDetail) => {
  return await UpdateBankingDetailToDB(bankingDetail);
};

// export const GetBusinessDetail = async (businessId: string) => {
//   return await GetBusinessDetailFromDB(businessId);
// };

// export const GetBusinessDetailForParent = async (businessId: string) => {
//   return await GetBusinessDetailForParentFromDB(businessId);
// };
