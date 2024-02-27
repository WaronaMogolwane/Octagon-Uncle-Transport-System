import axios from 'axios';
import {Trip} from '../Models/Trip';
import {ConvertDate} from '../Services/DataConverterService';
import {SERVER_HOST, SERVER_PORT} from '@env';
import {Passenger} from '../Models/Passenger';

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

export const GetUpcomingTripsParentFromDB = async (
  parentId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-upcoming-trips-for-parent`, {
      trip: {
        BusinessId: businessId,
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.DriverFirstName + ' ' + data.DriverLastName,
          pickUpTime: data.PickUpTime,
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

export const GetPastTripsParentFromDB = async (
  parentId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-past-trip-for-parent`, {
      trip: {
        BusinessId: businessId,
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.DriverFirstName + ' ' + data.DriverLastName,
          pickUpTime: data.PickUpTime,
          dropoffTime: data.DropoffTime,
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

export const GetUpcomingTripsDriverFromDB = async (
  parentId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-upcoming-trips-for-parent`, {
      trip: {
        BusinessId: businessId,
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          passengerId: data.Passenger.PassengerId,
          passengerName:
            data.Passenger.FirstName + ' ' + data.Passenger.FirstName,
          pickUpTime: data.Time,
          pickUpDate: ConvertDate(data.Date),
          pickUpLocation: data.Passenger.HomeAddress,
          tripStatus: data.Passenger.TripStatus,
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

export const GetPastTripsDriverFromDB = async (
  parentId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/trip/get-past-trip-for-driver`, {
      trip: {
        BusinessId: businessId,
        ParentId: parentId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.DriverFirstName + ' ' + data.DriverLastName,
          pickUpTime: data.PickUpTime,
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

export const GetAllTripsForBusinessFromDatabase = async (
  businessId: string,
) => {
  let res: any;
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
  passenger: Passenger[],
  tripId: string,
) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch(`${SERVER_HOST}:${SERVER_PORT}/trip/update-passenger-status`, {
      trip: {
        TripId: tripId,
        Passenger: passenger,
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

export const DeleteTripFromDatabase = async (uid: string) => {};

// export const GetAllPassengerFromDatabase = async (uid: string) => {
//   try {
//     let passengerArray: Passenger[] = [];

//     const querySnapshot = await getDocs(
//       collection(FIRESTORE_DB, 'Client', uid, 'Passenger'),
//     );
//     querySnapshot.docs.forEach(doc => {
//       let snapshot = doc.data();

//       let passenger = new Passenger(
//         snapshot.passengerId,
//         snapshot.firstName,
//         snapshot.lastName,
//         snapshot.age,
//         snapshot.sex,
//       );

//       passengerArray.push(passenger);
//     });

//     passengerArray = [...passengerArray];

//     console.log(passengerArray);

//     return passengerArray;
//   } catch (error) {
//     console.log(error);
//   }
// };
