import Router from "express-promise-router";
import { AddNewVehicle, GetVehicles, GetVehicleAndDriver } from "../Controllers/VehicleController";
import { UploadFile } from "../Services/BlobStorageService";

const router = Router();

router.get(
  "/get-vehicle-and-driver-for-business",
  GetVehicleAndDriver,
  async (req, res, next) => { }
);
router.post("/add-new-vehicle", AddNewVehicle, async (req, res, next) => {
});
router.get("/get-business-vehicles", GetVehicles, async (req, res, next) => {
});
export default router;
