import {
  AddBankingDetailToDB,
  GetBankListFromDB,
  UpdateBankingDetailToDB,
  ValidateAccountInDB,
} from '../Data/BankingDetailDAL';
import {BankingDetail} from '../Models/BankingDetail';

export const AddBankingDetail = async (bankingDetail: BankingDetail) => {
  return await AddBankingDetailToDB(bankingDetail);
};

export const UpdateBusinessDetail = async (bankingDetail: BankingDetail) => {
  return await UpdateBankingDetailToDB(bankingDetail);
};

export const GetBanksList = async () => {
  return await GetBankListFromDB();
};

export const ValidateAccount = async (accountDetails: any) => {
  return await ValidateAccountInDB(accountDetails);
};
