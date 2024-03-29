import Router from "express-promise-router";
import {
  AddPassengerDriverVehicleLinking,
  GetPassengerDriverVehicleLinking,
  RemovePassengerDriverVehicleLinking,
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

router.delete(
  "/delete-passenger-driver-vehicle-link",
  RemovePassengerDriverVehicleLinking,
  async (req, res, next) => {}
);

export default router;
