import Router from "express-promise-router";
import { AddNewVehicle, GetVehicles, GetVehicleAndDriver, LinkedDriverToVehicle as LinkDriverToVehicle } from "../Controllers/VehicleController";
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
router.post("/link-driver-and-vehicle", LinkDriverToVehicle, async (req, res, next) => {
});
router.delete("/delete-vehicle", GetVehicles, async (req, res, next) => {
});
export default router;
