import Router from "express-promise-router";
import {
  AddPassengerDriverVehicleLinking,
  GetPassengerDriverVehicleLinking,
} from "../Controllers/PassengerDriverVehicleLinkingController";

const router = Router();

router.post(
  "/add-passenger-driver-vehicle-link",
  AddPassengerDriverVehicleLinking,
  async (req, res, next) => {}
);

router.get(
  "/get-passenger-driver-vehicle-link",
  GetPassengerDriverVehicleLinking,
  async (req, res, next) => {}
);

export default router;
