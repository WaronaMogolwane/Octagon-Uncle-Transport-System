import { Passenger } from "../Models/Passenger";

export const AddPassengerToDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string
) => {};

export const GetPassengerFromDatabase = async (
  passengerId: string,
  uid: string
) => {};

export const GetAllPassengerFromDatabase = async (uid: string) => {};

export const DeletePassengerFromDatabase = async (
  passengerId: string,
  uid: string
) => {};

export const UpdatePassengerInDatabase = async (
  passengerDetails: Passenger,
  uid: string,
  passengerId: string
) => {};
