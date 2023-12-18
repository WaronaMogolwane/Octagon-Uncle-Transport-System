import axios from 'axios';
import {Trip} from '../Models/Trip';
import {ConvertDate} from '../Services/DataConverterService';

export const AddTripToDatabase = async (trip: Trip) => {
  await axios
    .post('http://192.168.3.57:9999/trip/add-trip', {
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

export const GetTripFromDatabase = async (tripId: string) => {
  let res: any;
  await axios
    .post('http://192.168.3.57:9999/trip/get-trip', {
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
        result.province,
      );

      res = userDetail;
    })
    .catch(error => {
      console.log(error);
      res = error;
    });
  return res;
};

export const GetUpcomingTripsFromDatabase = async (
  payerId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post('http://192.168.3.57:9999/trip/get-upcoming-trips-for-parent', {
      trip: {
        BusinessId: businessId,
        PayerId: payerId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.FirstName + ' ' + data.LastName,
          pickUpTime: data.Time,
          pickUpDate: ConvertDate(data.Date),
          passengerName: data.Passenger.FirstName,
          pickUpLocation: data.Passenger.HomeAddress,
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

export const GetPastTripsFromDatabase = async (
  payerId: string,
  businessId: string,
) => {
  let result: any;
  const tripData: {}[] = [];
  let trip = {};

  await axios
    .post('http://192.168.3.57:9999/trip/get-past-trip-for-parent', {
      trip: {
        BusinessId: businessId,
        PayerId: payerId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        trip = {
          tripId: data.TripId,
          driverName: data.FirstName + ' ' + data.LastName,
          pickUpTime: data.Time,
          pickUpDate: ConvertDate(data.Date),
          passengerName: data.Passenger.FirstName,
          pickUpLocation: data.Passenger.HomeAddress,
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
  //   await axios
  //     .post("http://192.168.3.57:9999/user-profile/get-user-details", {
  //       userDetails: {
  //         UserId: userId,
  //       },
  //     })
  //     .then((response: any) => {
  //       let result = response.data.result;

  //       let userDetail = new UserDetail(
  //         result.userDetail_id,
  //         result.firstname,
  //         result.lastname,
  //         result.addressline1,
  //         result.addressline2,
  //         result.suburb,
  //         result.city,
  //         result.province,
  //         result.postalcode,
  //         result.user_id
  //       );

  //       res = userDetail;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res = error;
  //     });
  //   return res;
};

export const UpdateTripInDatabase = async (trip: Trip) => {
  let statusCode: any;
  let data: any;

  await axios
    .patch('http://192.168.3.57:9999/passenger/update-passenger-details', {
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

export const GetAllUserDetailsFromDatabase = async () => {};

export const DeleteTripFromDatabase = async (uid: string) => {};
function then(arg0: (response: any) => void) {
  throw new Error('Function not implemented.');
}

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
