import {SERVER_HOST, SERVER_PORT} from '@env';
import axios from 'axios';
import {Vehicle} from '../Models/VehicleModel';

export const InsertNewDriverVehicleLink = async (
  driverId: string,
  vehicleLicenseNumber: string,
  vehicleId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/vehicle/link-driver-and-vehicle`, {
      DriverId: driverId,
      VehicleId: vehicleId,
      VehicleLicenseNumber: vehicleLicenseNumber,
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch((error: any) => {
      callback(error, null);
    });
};
export const AddVehicleToDatabase = async (
  newVehicle: Vehicle,
  frontImage: string,
  rearImage: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/vehicle/add-new-vehicle`, {
      RegistrationNumber: newVehicle.RegistrationNumber,
      Make: newVehicle.Make,
      Model: newVehicle.Model,
      Vin: newVehicle.Vin,
      EngineNumber: newVehicle.EngineNumber,
      Colour: newVehicle.Colour,
      BusinessId: newVehicle.BusinessId,
      LicenseNumber: newVehicle.LicenseNumber,
      FrontImage: frontImage,
      RearImage: rearImage,
      FileType: 'image/jpeg',
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch((error: any) => {
      callback(error, null);
    });
};

export const UpdateVehicleDetails = async (
  vehicleDetails: Vehicle,
  transporterUid: string,
) => {
  let response;
  return response;
};

export const GetAllVehiclesFromDatabase = async (transporterUid: string) => {
  let response;
  return response;
};

export const GetVehicleAndDriverFromDB = async (businessId: string) => {
  let result: any;
  let vehicle = {};
  const vehicleData: {}[] = [];

  await axios
    .get(
      `${SERVER_HOST}:${SERVER_PORT}/vehicle/get-vehicle-and-driver-for-business`,
      {
        params: {
          BusinessId: businessId,
        },
      },
    )
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        vehicle = {
          vehicleId: data.VehicleId,
          licenseNumber: data.LicenseNumber,
          make: data.Make,
          model: data.Model,
          color: data.Colour,
          fullName: data.FirstName + ' ' + data.LastName,
        };

        vehicleData.push(vehicle);
      });

      result = vehicleData;
    })
    .catch((error: any) => {
      console.error(error);
      result = error;
    });

  return result;
};
export const InsertNewVehicle = async (businessId: string) => {
  let result: any;
  let vehicle = {};
  const vehicleData: {}[] = [];

  await axios
    .post(`${SERVER_HOST}:${SERVER_PORT}/vehicle/add-new-vehicle`, {
      params: {
        BusinessId: businessId,
      },
    })
    .then((response: any) => {
      let res = [...response.data.result];

      res.forEach(data => {
        vehicle = {
          vehicleId: data.VehicleId,
          registrationNumber: data.RegistrationNumber,
          make: data.Make,
          model: data.Model,
          color: data.Color,
          fullName: data.FirstName + ' ' + data.LastName,
        };

        vehicleData.push(vehicle);
      });

      result = vehicleData;
    })
    .catch((error: any) => {
      console.error(error);
      result = error;
    });

  return result;
};
export const DeleteVehicleByBusinessIdAndLicenseNuimber = async (
  businessId: string,
  vehicleId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .delete(`${SERVER_HOST}:${SERVER_PORT}/vehicle/delete-vehicle`, {
      data: {
        BusinessId: businessId,
        VehicleId: vehicleId,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const DeleteDriverVehicleLinkByDriverId = async (
  driverId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .delete(
      `${SERVER_HOST}:${SERVER_PORT}/vehicle/delete-driver-vehicle-link`,
      {
        data: {
          DriverId: driverId,
        },
      },
    )
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      console.error(error);

      callback(error, null);
    });
};
export const DeleteVehicleByDriverIdAndVehicleId = async (
  driverId: string,
  vehicleId: number,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .delete(`${SERVER_HOST}:${SERVER_PORT}/vehicle/delete-vehicle`, {
      data: {
        DriverId: driverId,
        VehicleId: vehicleId,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      console.error(error);

      callback(error, null);
    });
};
export const GetVehicleByLicenseNumberAndBusinessId = async (
  businessId: string,
  licenseNumber: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/vehicle/get-vehicle-status`, {
      params: {
        BusinessId: businessId,
        LicenseNumber: licenseNumber,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
export const GetVehiclesByBusinessId = async (
  businessId: string,
  callback: (error: any, result: any) => void,
) => {
  await axios
    .get(`${SERVER_HOST}:${SERVER_PORT}/vehicle/get-business-vehicles`, {
      params: {
        businessId: businessId,
      },
    })
    .then((response: any) => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};
