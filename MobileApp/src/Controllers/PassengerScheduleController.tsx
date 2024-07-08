import {
  AddPassengerScheduleToDB,
  AddTempPassengerScheduleToDB,
  GetPassengerScheduleFromDB,
  UpdatePassengerScheduleToDB,
} from '../Data/PassengerScheduleDAL';
import {PassengerSchedule} from '../Models/PassengerSchedule';

export const AddPassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
) => {
  return await AddPassengerScheduleToDB(passengerSchedule);
};

export const AddTempPassengerSchedule = async (passengerId: string) => {
  return await AddTempPassengerScheduleToDB(passengerId);
};

export const GetPassengerSchedule = async (passengerId: string) => {
  return await GetPassengerScheduleFromDB(passengerId);
};

export const UpdatePassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
) => {
  return await UpdatePassengerScheduleToDB(passengerSchedule);
};
