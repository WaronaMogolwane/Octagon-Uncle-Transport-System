import {
  AddPassengerScheduleToDB,
  UpdatePassengerScheduleToDB,
} from '../Data/PassengerScheduleDAL';
import {PassengerSchedule} from '../Models/PassengerSchedule';

export const AddPassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
) => {
  return await AddPassengerScheduleToDB(passengerSchedule);
};

export const UpdatePassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
) => {
  return await UpdatePassengerScheduleToDB(passengerSchedule);
};