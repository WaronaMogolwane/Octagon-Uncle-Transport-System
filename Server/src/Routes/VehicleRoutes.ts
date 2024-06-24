import Router from "express-promise-router";
import { AddNewVehicle, GetVehicle, GetVehicleAndDriver } from "../Controllers/VehicleController";
import { UploadFile } from "../Services/BlobStorageService";

const router = Router();

router.get(
  "/get-vehicle-and-driver-for-business",
  GetVehicleAndDriver,
  async (req, res, next) => { }
);
router.post("/add-new-vehicle", AddNewVehicle, async (req, res, next) => {
});
router.post("/get-vehicle", GetVehicle, async (req, res, next) => {
});
export default router;
