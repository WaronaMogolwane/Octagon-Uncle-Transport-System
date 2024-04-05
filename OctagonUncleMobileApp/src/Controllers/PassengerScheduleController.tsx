import {AddPassengerScheduleToDB} from '../Data/PassengerScheduleDAL';
import {PassengerSchedule} from '../Models/PassengerSchedule';

export const AddPassengerSchedule = async (
  passengerSchedule: PassengerSchedule,
) => {
  return await AddPassengerScheduleToDB(passengerSchedule);
};
