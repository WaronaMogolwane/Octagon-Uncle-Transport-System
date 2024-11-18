import { randomUUID } from "crypto";
import { UserDetail } from "../Classes/UserDetail";

import {
  InsertUserDetail,
  GetUserDetailByUserId,
  UpdateUserDetail,
  UpdateProfileImageUrlByUserId,
  GetUserDetailProfileImageByUserId,
} from "../Models/UserDetailsModel";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { UploadFile } from "../Services/BlobStorageService";

export const AddUserDetail = async (req: any, res: any, next: any) => {
  let newUserDetail = new UserDetail(
    randomUUID(),
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.PhoneNumber,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );
  await InsertUserDetail(newUserDetail, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        UserCreated: true,
        result: result[0],
      });
    }
  });
};

export const GetUserDetail = async (req: any, res: any, next: any) => {
  let userId = req.query.UserId;

  await GetUserDetailByUserId(userId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const GetUserProfileImage = async (req: any, res: any, next: any) => {
  let userId = req.query.UserId;

  await GetUserDetailProfileImageByUserId(userId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const UpdateUserPersonalDetail = async (
  req: any,
  res: any,
  next: any
) => {
  let userDetail = new UserDetail(
    req.body.userDetail.UserDetailId,
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.Cellphone,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );

  await UpdateUserDetail(userDetail, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const UpdateProfileImageUrl = async (req: any, res: any, next: any) => {
  let user = {
    userId: req.body.params.UserId,
    profileImageUrl: req.body.params.ProfileImageUrl,
  };

  const filePath = `User-Files/${user.userId}/User-Details/`;
  const profileImageName = filePath + "Profile-Image.jpeg";

  await UploadFile(
    user.profileImageUrl,
    profileImageName,
    req.body.params.FileType,
    async (error, result) => {
      if (error) {
        next(new ErrorResponse(501, error.response.data));
      } else {
        let userDetail = {
          userId: req.body.params.UserId,
          imagePath: profileImageName,
        };

        await UpdateProfileImageUrlByUserId(
          userDetail,
          async (error, result) => {
            if (error) {
              next(new ErrorResponse(501, error.message));
            } else {
              res.status(200).json({
                profileImageUpdated: true,
                result: result,
              });
            }
          }
        );
      }
    }
  );
};

// export const AddNewVehicle = async (req: any, res: any, next: any) => {
//   let newVehicle: Vehicle = {
//     FrontImage: req.body.FrontImage,
//     RearImage: req.body.RearImage,
//     LicenseNumber: req.body.LicenseNumber,
//     Make: req.body.Make,
//     Model: req.body.Model,
//     Colour: req.body.Colour,
//     EngineNumber: req.body.EngineNumber,
//     RegistrationNumber: req.body.RegistrationNumber,
//     Vin: req.body.Vin,
//     BusinessId: req.body.BusinessId,
//     Description: req.body.Description,
//     DateCreated: Date.now().toString(),
//   };
//   const filePath = `User-Files/${newVehicle.BusinessId}/Vehicles/${newVehicle.LicenseNumber}/`;
//   const frontImageName = filePath + "Front-Image.jpeg";
//   const rearImageName = filePath + "Rear-Image.jpeg";

//   await UploadFile(
//     newVehicle.RearImage,
//     rearImageName,
//     req.body.FileType,
//     async (error, result) => {
//       if (error) {
//         next(new ErrorResponse(501, error.response.data));
//       } else {
//         newVehicle.FrontImage = frontImageName;
//         newVehicle.RearImage = rearImageName;
//         await InsertNewVehicle(newVehicle, async (error, result) => {
//           if (error) {
//             next(new ErrorResponse(501, error.message));
//           } else {
//             res.status(200).json({
//               VehicleAdded: true,
//               result: result,
//             });
//           }
//         });
//       }
//     }
//   );
// };
