import Router from "express-promise-router";
import { GetVehicleAndDriver } from "../Controllers/VehicleController";

const router = Router();

router.get(
  "/get-vehicle-and-driver-for-business",
  GetVehicleAndDriver,
  async (req, res, next) => {}
);

export default router;
