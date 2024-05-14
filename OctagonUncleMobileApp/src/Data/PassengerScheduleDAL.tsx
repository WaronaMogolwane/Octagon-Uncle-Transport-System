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

export const GetPassengerScheduleFromDB = async (passengerId: string) => {
  let res: any;
  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/get-passenger-schedule`,
      {
        params: {
          PassengerId: passengerId,
        },
      },
    )
    .then((response: any) => {
      let result = response.data.result;

      let passengerSchedule = new PassengerSchedule(
        result[0].Monday,
        result[0].Tuesday,
        result[0].Wednesday,
        result[0].Thursday,
        result[0].Friday,
        result[0].Saturday,
        result[0].Sunday,
        result[0].PassengerId,
        result[0].DriverVehicleLinkingId,
        result[0].PassengerScheduleId,
      );

      res = passengerSchedule;
    })
    .catch(error => {
      console.log(error);
      res = error;
    });
  return res;
};

export const UpdatePassengerScheduleToDB = async (
  passengerSchedule: PassengerSchedule,
) => {
  let result: any;

  await axios
    .patch(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/update-passenger-schedule`,
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
