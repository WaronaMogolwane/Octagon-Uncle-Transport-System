import { Vehicle } from "../Classes/Vehicle";
import { DbPool } from "../Services/DatabaseService";

// Reusable query execution function
const executeQuery = async (query: string, values: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    DbPool.query({ sql: query, timeout: 40000, values }, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Get vehicle and driver by business
export const GetVehicleAndDriverByBusiness = async (businessId: string): Promise<any> => {
  const query = "CALL GetVehicleAndDriverForBusiness(?);";
  return executeQuery(query, [businessId]);
};

// Insert a new driver-vehicle link
export const InsertNewDriverVehicleLink = async (driverId: string, vehicleId: number): Promise<any> => {
  const query = "CALL InsertDriverVehicleLink(?,?);";
  return executeQuery(query, [driverId, vehicleId]);
};

// Insert a new vehicle
export const InsertNewVehicle = async (newVehicle: Vehicle): Promise<any> => {
  const query = "CALL InsertNewVehicle(?,?,?,?,?,?,?,?,?,?,?);";
  const values = [
    newVehicle.RegistrationNumber,
    newVehicle.Make,
    newVehicle.Model,
    newVehicle.Vin,
    newVehicle.EngineNumber,
    newVehicle.Colour,
    newVehicle.BusinessId,
    newVehicle.LicenseNumber,
    "/" + newVehicle.FrontImage,
    "/" + newVehicle.RearImage,
    "", // Placeholder for additional data
  ];
  return executeQuery(query, values);
};

// Delete a driver-vehicle link by driver ID
export const DeleteDriverVehicleLinkByDriverId = async (driverId: string): Promise<any> => {
  const query = "CALL DeleteDriverVehicleLinkByDriverId(?);";
  return executeQuery(query, [driverId]);
};

// Delete a vehicle by driver and vehicle IDs
export const DeleteVehicleByDriverIdAndVehicleId = async (driverId: string, vehicleId: number): Promise<any> => {
  const query = "CALL DeleteVehicleByDriverIdAndVehicleId(?,?);";
  return executeQuery(query, [driverId, vehicleId]);
};

// Get vehicles by business ID
export const GetVehiclesByBusinessId = async (businessId: string): Promise<any> => {
  const query = "CALL GetVehiclesByBusinessId(?);";
  return executeQuery(query, [businessId]);
};

// Get vehicles linked to a driver by driver ID
export const GetVehiclesByDriverId = async (driverId: string): Promise<any> => {
  const query = "CALL GetVehicleLinkedToDriver(?);";
  return executeQuery(query, [driverId]);
};

// Get vehicle by license number and business ID
export const GetVehicleByLicenseNumberAndBusinessId = async (
  businessId: string,
  licenseNumber: string
): Promise<any> => {
  const query = "CALL GetVehicleByLicenseNumberAndBusinessId(?,?);";
  return executeQuery(query, [licenseNumber, businessId]);
};