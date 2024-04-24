import Router from "express-promise-router";
import {
  AddPassengerSchedule,
  UpdatePassengerScheduleByPassengerId,
} from "../Controllers/PassengerScheduleController";

const router = Router();

router.post(
  "/add-passenger-schedule",
  AddPassengerSchedule,
  async (req, res, next) => {}
);

router.patch(
  "/update-passenger-schedule",
  UpdatePassengerScheduleByPassengerId,
  async (req, res, next) => {}
);

export default router;
