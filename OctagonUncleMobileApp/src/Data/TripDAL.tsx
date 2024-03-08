import axios from 'axios';
import {Trip} from '../Models/Trip';
import {ConvertDate, SplitTimeString} from '../Services/DataConverterService';
import {SERVER_HOST, SERVER_PORT} from '@env';

export const AddTripToDB = async (trip: Trip) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/add-trip`, {
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
};

export const GetTripFromDB = async (tripId: string) => {
  let res: any;
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-trip`, {
      trip: {
        TripId: tripId,
      },
    })
    .then((response: any) => {
      let result = response.data.result;

      let trip = new Trip(
        result.trip_id,
        result.registrationnumber,
        [...result.passenger],
        result.vehicle_id,
        result.business_id,
        result.driver_id,
        result.date,
        result.time,
        result.iscompleted,
      );

      res = trip;
    })
    .catch(error => {
      console.log(error);
      res = error;
    });
  return res;
};

export const GetUpcomingTripsParentFromDB = async (parentId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-upcoming-trips-for-parent`, {
      trip: {
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.DriverFirstName + ' ' + data.DriverLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropoffTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpLocation: data.HomeAddress,
          dropoffLocation: data.DestinationAddress,
          tripStatus: Number(data.TripStatus),
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const GetPastTripsParentFromDB = async (parentId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-past-trip-for-parent`, {
      trip: {
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.DriverFirstName + ' ' + data.DriverLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropoffTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpLocation: data.HomeAddress,
          dropoffLocation: data.DestinationAddress,
          tripStatus: Number(data.TripStatus),
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const GetUpcomingTripsDriverFromDB = async (driverId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-upcoming-trip-for-driver`, {
      trip: {
        DriverId: driverId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          passengerId: data.PassengerUserId,
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropOffUpTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          pickUpLocation: data.HomeAddress,
          dropOffLocation: data.DestinationAddress,
          tripStatus: Number(data.TripStatus),
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const GetPastTripsDriverFromDB = async (driverId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-past-trip-for-driver`, {
      trip: {
        DriverId: driverId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          passengerId: data.PassengerUserId,
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropOffTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          pickUpLocation: data.HomeAddress,
          dropOffLocation: data.DestinationAddress,
          tripStatus: Number(data.TripStatus),
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const GetUpcomingTripsBusinessFromDB = async (businessId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-upcoming-trip-for-business`, {
      trip: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          passengerId: data.PassengerId,
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropOffUpTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          pickUpLocation: data.HomeAddress,
          dropOffLocation: data.DestinationAddress,
          tripStatus: data.TripStatus,
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const GetPastTripsBusinessFromDB = async (businessId: string) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-past-trip-for-business`, {
      trip: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          passengerId: data.PassengerId,
          passengerName: data.PassengerFirstName + ' ' + data.PassengerLastName,
          pickUpTime: SplitTimeString(data.PickUpTime),
          dropOffUpTime: SplitTimeString(data.DropoffTime),
          pickUpDate: ConvertDate(data.Date),
          pickUpLocation: data.HomeAddress,
          dropOffLocation: data.DestinationAddress,
          tripStatus: Number(data.TripStatus),
        };

        tripData.push(trip);
      });

      result = tripData;
    })
    .catch((error: any) => {
      console.log(error);
      result = error;
    });

  return result;
};

export const UpdateTripInDB = async (trip: Trip) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/passenger/update-passenger-details`, {
      userDetail: {
        // UserDetailId: trip.userDetailId,
        // FirstName: trip.firstName,
        // LastName: trip.lastName,
        // AddressLine1: trip.addressLine1,
        // AddressLine2: trip.addressLine2,
        // Surburb: trip.suburb,
        // City: trip.city,
        // Province: trip.province,
        // PostalCode: trip.postalCode,
        // UserId: trip.userId,
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

export const UpdatePassengerStatusInDB = async (
  status: number,
  tripId: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/trip/update-passenger-status`, {
      trip: {
        TripId: tripId,
        TripStatus: status,
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

export const UpdateTripPickUpTimeInDB = async (tripId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/trip/update-trip-pickup-time`, {
      trip: {
        TripId: tripId,
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

export const UpdateTripDropOffTimeInDB = async (tripId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/trip/update-trip-dropoff-time`, {
      trip: {
        TripId: tripId,
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

export const EndTripInDB = async (tripId: string) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/trip/end-trip`, {
      trip: {
        TripId: tripId,
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
