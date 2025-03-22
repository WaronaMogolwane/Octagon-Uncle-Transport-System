import { ErrorResponse } from "../Classes/ErrorResponse";
import { Vehicle } from "../Classes/Vehicle";
import {
  DeleteDriverVehicleLinkByDriverId,
  DeleteVehicleByDriverIdAndVehicleId,
  GetVehicleAndDriverByBusiness,
  GetVehicleByLicenseNumberAndBusinessId,
  GetVehiclesByBusinessId,
  GetVehiclesByDriverId,
  InsertNewDriverVehicleLink,
  InsertNewVehicle,
} from "../Models/VehicleModel";
import { UploadFile } from "../Services/BlobStorageService";

// Helper function for centralized error handling
const handleError = (error: any, next: any, status: number, message: string): void => {
  console.error(message, error);
  next(new ErrorResponse(status, error.message || message, error.stack));
};

// Helper function for success responses
const sendSuccess = (res: any, message: string, result: any = null) => {
  res.status(200).json({ message, result });
};

// Link a driver to a vehicle
export const LinkedDriverToVehicle = async (req: any, res: any, next: any) => {
  try {
    const { DriverId: driverId, VehicleId: vehicleId } = req.body;
    const result = await InsertNewDriverVehicleLink(driverId, vehicleId);
    sendSuccess(res, "Driver linked to vehicle successfully", result);
  } catch (error) {
    handleError(error, next, 501, "Failed to link driver to vehicle");
  }
};

// Add a new vehicle and upload images
export const AddNewVehicle = async (req: any, res: any, next: any) => {
  try {
    const newVehicle: Vehicle = {
      FrontImage: req.body.FrontImage,
      RearImage: req.body.RearImage,
      LicenseNumber: req.body.LicenseNumber,
      Make: req.body.Make,
      Model: req.body.Model,
      Colour: req.body.Colour,
      EngineNumber: req.body.EngineNumber,
      RegistrationNumber: req.body.RegistrationNumber,
      Vin: req.body.Vin,
      BusinessId: req.body.BusinessId,
      Description: req.body.Description,
      DateCreated: Date.now().toString(),
    };

    const filePath = `User-Files/${newVehicle.BusinessId}/Vehicles/${newVehicle.LicenseNumber}/`;
    const frontImageName = `${filePath}Front-Image.jpeg`;
    const rearImageName = `${filePath}Rear-Image.jpeg`;

    // Upload rear image first
    await UploadFile(newVehicle.RearImage, rearImageName, req.body.FileType);
    newVehicle.FrontImage = frontImageName;
    newVehicle.RearImage = rearImageName;

    // Save vehicle record
    const result = await InsertNewVehicle(newVehicle);
    sendSuccess(res, "Vehicle added successfully", result);
  } catch (error) {
    handleError(error, next, 501, "Failed to add new vehicle");
  }
};

// Check if a vehicle exists
export const CheckIfVehicleExists = async (req: any, res: any, next: any) => {
  try {
    const { BusinessId: businessId, LicenseNumber: licenseNumber } = req.query;
    const result = await GetVehicleByLicenseNumberAndBusinessId(businessId, licenseNumber);

    if (result[0]?.[0]) {
      const isActive = result[0][0].IsActive;
      res.status(200).send({ VehicleExists: true, IsActive: isActive });
    } else {
      res.status(200).send({ VehicleExists: false, IsActive: false });
    }
  } catch (error) {
    handleError(error, next, 400, "Failed to check if vehicle exists");
  }
};

// Retrieve vehicles and drivers
export const GetVehicleAndDriver = async (req: any, res: any, next: any) => {
  try {
    const businessId = req.query.BusinessId;
    const result = await GetVehicleAndDriverByBusiness(businessId);
    sendSuccess(res, "Vehicle and driver records retrieved successfully", result[0]);
  } catch (error) {
    handleError(error, next, 501, "Failed to retrieve vehicle and driver records");
  }
};

// Delete driver-vehicle link
export const DeleteDriverVehicleLink = async (req: any, res: any, next: any) => {
  try {
    const driverId = req.body.DriverId;
    const result = await DeleteDriverVehicleLinkByDriverId(driverId);
    sendSuccess(res, "Driver-vehicle link deleted successfully", result);
  } catch (error) {
    handleError(error, next, 400, "Failed to delete driver-vehicle link");
  }
};

// Delete a vehicle
export const DeleteVehicle = async (req: any, res: any, next: any) => {
  try {
    const { DriverId: driverId, VehicleId: vehicleId } = req.body;
    const result = await DeleteVehicleByDriverIdAndVehicleId(driverId, vehicleId);
    sendSuccess(res, "Vehicle deleted successfully", result);
  } catch (error) {
    handleError(error, next, 400, "Failed to delete vehicle");
  }
};

// Fetch all vehicles for a business
export const GetVehicles = async (req: any, res: any, next: any) => {
  try {
    const businessId = req.query.businessId;
    const result = await GetVehiclesByBusinessId(businessId);
    if (result[0]) {
      sendSuccess(res, "Vehicles retrieved successfully", result[0]);
    } else {
      res.status(400).send(new ErrorResponse(400, "No vehicles found."));
    }
  } catch (error) {
    handleError(error, next, 400, "Failed to retrieve vehicles");
  }
};

// Fetch vehicles linked to a driver
export const GetDriverVehicle = async (req: any, res: any, next: any) => {
  try {
    const driverId = req.query.DriverId;
    const result = await GetVehiclesByDriverId(driverId);
    if (result[0]) {
      sendSuccess(res, "Driver's vehicles retrieved successfully", result[0]);
    } else {
      res.status(400).send(new ErrorResponse(400, "No vehicles found."));
    }
  } catch (error) {
    handleError(error, next, 400, "Failed to retrieve driver's vehicles");
  }
};
