export const FilterRows = async (rows: any[], payerId: string) => {
  let result = [];

  for (let x = 0; x < rows.length; x++) {
    let passenger = [...rows[x].passenger];
    for (let y = 0; y < passenger.length; y++) {
      if (passenger[y].PayerId == payerId) {
        let res = {
          TripId: rows[x].trip_id,
          RegistrationNumber: rows[x].registrationnumber,
          VehicleId: rows[x].vehicle_id,
          BusinessId: rows[x].t_business_id,
          DriverId: rows[x].t_driver_id,
          Date: rows[x].date,
          Time: rows[x].time,
          FirstName: rows[x].firstname,
          LastName: rows[x].lastname,
          Passenger: passenger[y],
        };

        result.push(res);
      }
    }
  }

  return result;
};
