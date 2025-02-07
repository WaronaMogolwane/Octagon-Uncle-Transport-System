import axios, {AxiosError, AxiosResponse} from 'axios';
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

export const AddTempPassengerScheduleToDB = async (passengerId: string) => {
  let result: any;

  await axios
    .post(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/add-temp-passenger-schedule`,
      {
        params: {
          PassengerId: passengerId,
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
  let errorCode: any;
  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/get-passenger-schedule`,
      {
        params: {
          PassengerId: passengerId,
        },
      },
    )
    .then((response: AxiosResponse) => {
      const [scheduleData] = response.data.result;
      res = new PassengerSchedule(
        scheduleData.Monday,
        scheduleData.Tuesday,
        scheduleData.Wednesday,
        scheduleData.Thursday,
        scheduleData.Friday,
        scheduleData.Saturday,
        scheduleData.Sunday,
        scheduleData.PassengerId,
        scheduleData.DriverVehicleLinkingId,
        scheduleData.PassengerScheduleId,
      );
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      errorCode = error;
    });

  return [res, errorCode];
};

export const CheckPassengerScheduleFromDB = async (passengerId: string) => {
  let res: any;
  let errorCode: any;
  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/passenger-schedule/get-passenger-schedule-check-availability`,
      {
        params: {
          PassengerId: passengerId,
        },
      },
    )
    .then((response: AxiosResponse) => {
      const [scheduleData] = response.data.result;

      res = scheduleData;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      errorCode = error;
    });

  return [res, errorCode];
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
