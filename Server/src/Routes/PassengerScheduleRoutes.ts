import Router from "express-promise-router";
import {
  AddPassengerSchedule,
  AddTempPassengerSchedule,
  GetPassengerScheduleByPassengerId,
  UpdatePassengerScheduleByPassengerId,
} from "../Controllers/PassengerScheduleController";

const router = Router();

router.post(
  "/add-passenger-schedule",
  AddPassengerSchedule,
  async (req, res, next) => {}
);

router.post(
  "/add-temp-passenger-schedule",
  AddTempPassengerSchedule,
  async (req, res, next) => {}
);

router.get(
  "/get-passenger-schedule",
  GetPassengerScheduleByPassengerId,
  async (req, res, next) => {}
);

router.patch(
  "/update-passenger-schedule",
  UpdatePassengerScheduleByPassengerId,
  async (req, res, next) => {}
);

export default router;
