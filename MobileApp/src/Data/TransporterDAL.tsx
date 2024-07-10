import {Transporter} from '../Models/TransporterDetailsModel';
import {BusinessDetail} from '../Models/BusinessDetailsModel';
import {v4 as uuidv4} from 'uuid';

let currentDate = new Date(Date.now());

export const AddTransporterToDatabase = async (
  transporterDetails: Transporter,
  transporterUid: string,
) => {
  let response;

  return response;
};
export const GetTransporterDetails = async (transporterUid: string) => {
  let response;
  return response;
};
export const CreateUserVerification = async (
  firstName: string,
  lastName: string,
  email: string,
  cellphone: string,
  verificationCode: string,
  transporterUid: string,
  userRole: number,
) => {
  let response;
  return response;
};
export const CheckIfUserVerificationExists = async (
  verificationCode: string,
  userRole: string,
) => {};
export const UpdateTransporterDetails = async (
  transporterDetails: Transporter,
  transporterUid: string,
) => {
  let response;
  return response;
};
export const VerifyUser = async (
  verificationCode: string,
  userRole: number,
) => {
  let response;
  return response;
};
export const AddBusinessDetails = async (
  businessDetails: BusinessDetail,
  transporterUid: string,
) => {
  let response;
  return response;
};
