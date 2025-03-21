import {
  AddBankingDetailToDB,
  GetBankingDetailFromDB,
  GetBankListFromDB,
  UpdateBankingDetailToDB as UpdateBankingDetailInDB,
  ValidateAccountInDB,
} from '../Data/BankingDetailDAL';
import {BankingDetail} from '../Models/BankingDetail';

export const AddBankingDetail = async (bankingDetail: BankingDetail) => {
  return await AddBankingDetailToDB(bankingDetail);
};

export const GetBankingDetail = async (businessId: string) => {
  return await GetBankingDetailFromDB(businessId);
};

export const UpdateBankingDetail = async (bankingDetail: BankingDetail) => {
  return await UpdateBankingDetailInDB(bankingDetail);
};

export const GetBanksList = async () => {
  return await GetBankListFromDB();
};

export const ValidateAccount = async (accountDetails: any) => {
  return await ValidateAccountInDB(accountDetails);
};
