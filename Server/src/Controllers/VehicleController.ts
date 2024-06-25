import { error } from "console";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { Vehicle } from "../Classes/Vehicle";
import { GetVehicleAndDriverByBusiness, GetVehiclesByBusinessId, InsertNewVehicle } from "../Models/VehicleModel";
import { GetUploadUrl, UploadFile } from "../Services/BlobStorageService";

export const AddNewVehicle = async (req: any, res: any, next: any) => {
  let newVehicle: Vehicle = {
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
    DateCreated: Date.now().toString()
  }
  const filePath = `User-Files/${newVehicle.BusinessId}/Vehicles/${newVehicle.LicenseNumber}/`;
  const frontImageName = filePath + 'Front-Image.jpeg';
  const rearImageName = filePath + 'Rear-Image.jpeg';

  await UploadFile(newVehicle.FrontImage, frontImageName, req.body.FileType, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error));
    }
    else {
      await UploadFile(newVehicle.RearImage, rearImageName, req.body.FileType, async (error, result) => {
        if (error) {
          next(new ErrorResponse(501, error));
        }
        else {
          newVehicle.FrontImage = frontImageName;
          newVehicle.RearImage = rearImageName;
          await InsertNewVehicle(newVehicle, async (error, result) => {
            if (error) {
              next(new ErrorResponse(501, error.message));
            }
            else {
              res.status(200).json({
                VehicleAdded: true,
                result: result,
              });
            }
          });
        }
      })
    }
  });
};

export const GetVehicle = async (req: any, res: any, next: any) => {
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
    DateCreated: Date.now().toString()
  }

  await InsertNewVehicle(newVehicle, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      next();
    }
  });
};
export const GetVehicleAndDriver = async (req: any, res: any, next: any) => {
  let businessId = req.body.BusinessId;

  await GetVehicleAndDriverByBusiness(businessId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};
export const GetVehicles = async (req: any, res: any, next: any) => {
  let businessId = req.query.businessId;
  await GetVehiclesByBusinessId(businessId, (error, result) => {
    if (error) {
      next(new ErrorResponse(400, error.message));
    }
    else {
      if (result[0]) {
        res.status(200).send(result[0]);
      }
      else {
        res.status(400).send(new ErrorResponse(400, "No vehicles found."));
      }
    }
  });
};

