import axios from "axios";
import { Trip } from "../Models/Trip";

export const AddTripToDatabase = async (trip: Trip) => {
  await axios
    .post("http://192.168.3.57:9999/trip/add-trip", {
      trip: {
        RegistrationNumber: trip.registrationNumber,
        Passengers: trip.passenger,
        VehicleId: trip.vehicleId,
        BusinessId: trip.businesId,
        DriverId: trip.driverId,
        Date: trip.date,
        Time: trip.time,
      },
    })
    .then((response: any) => {
      console.log(response.data, response.status);
    })
    .catch((error: any) => {
      console.log(error);
    });

  [];
};

export const GetTripFromDatabase = async (tripId: string) => {
  let res: any;
  await axios
    .post("http://192.168.3.57:9999/trip/get-trip", {
      trip: {
        TripId: tripId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let userDetail = new Trip(
        result.userDetail_id,
        result.firstname,
        result.lastname,
        result.addressline1,
        result.addressline2,
        result.suburb,
        result.city,
        result.province
      );

      res = userDetail;
    })
    .catch((error) => {
      console.log(error);
      res = error;
    });
  return res;
};

export const GetAllTripsForClientFromDatabase = async (
  payerId: string,
  businessId: string
) => {
  let res: any;
  await axios
    .post("http://192.168.3.57:9999/user-profile/get-user-details", {
      userDetails: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let userDetail = new UserDetail(
        result.userDetail_id,
        result.firstname,
        result.lastname,
        result.addressline1,
        result.addressline2,
        result.suburb,
        result.city,
        result.province,
        result.postalcode,
        result.user_id
      );

      res = userDetail;
    })
    .catch((error) => {
      console.log(error);
      res = error;
    });
  return res;
};

export const GetAllTripsForBusinessFromDatabase = async (
  businessId: string
) => {
  let res: any;
  await axios
    .post("http://192.168.3.57:9999/user-profile/get-user-details", {
      userDetails: {
        UserId: userId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let userDetail = new UserDetail(
        result.userDetail_id,
        result.firstname,
        result.lastname,
        result.addressline1,
        result.addressline2,
        result.suburb,
        result.city,
        result.province,
        result.postalcode,
        result.user_id
      );

      res = userDetail;
    })
    .catch((error) => {
      console.log(error);
      res = error;
    });
  return res;
};

export const UpdateTripInDatabase = async (userDetails: UserDetail) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch("http://192.168.3.57:9999/passenger/update-passenger-details", {
      userDetail: {
        UserDetailId: userDetails.userDetailId,
        FirstName: userDetails.firstName,
        LastName: userDetails.lastName,
        AddressLine1: userDetails.addressLine1,
        AddressLine2: userDetails.addressLine2,
        Surburb: userDetails.suburb,
        City: userDetails.city,
        Province: userDetails.province,
        PostalCode: userDetails.postalCode,
        UserId: userDetails.userId,
      },
    })
    .then((response: any) => {
      data = response.data;
      statusCode = response.status;
    })
    .catch((error: any) => {
      console.log(error);
    });

  return [data, statusCode];
};

export const GetAllUserDetailsFromDatabase = async () => {};

export const DeleteTripFromDatabase = async (uid: string) => {};
