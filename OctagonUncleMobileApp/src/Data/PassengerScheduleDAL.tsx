import axios from 'axios';
import {PassengerSchedule} from '../Models/PassengerSchedule';
import {SERVER_HOST, SERVER_PORT} from '@env';

export const AddPassengerScheduleToDB = async (
  passengerSchedule: PassengerSchedule,
) => {
  let result: any;

  await axios
    .post(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/add-passenger-schedule`,
      {
        params: {
          PassengerScheduleId: passengerSchedule.passengerScheduleId,
          Monday: passengerSchedule.monday,
          Tuesday: passengerSchedule.tuesday,
          Wednesday: passengerSchedule.wednesday,
          Thursday: passengerSchedule.thursday,
          Friday: passengerSchedule.friday,
          Saturday: passengerSchedule.saturday,
          Sunday: passengerSchedule.sunday,
          PassengerId: passengerSchedule.passengerId,
          VehicleId: passengerSchedule.vehicleId,
        },
      },
    )
    .then((response: any) => {
      result = response.status;
    })
    .catch((error: any) => {
      result = error;
    });

  return result;
};
