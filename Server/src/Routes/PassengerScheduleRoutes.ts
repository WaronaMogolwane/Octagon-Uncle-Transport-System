import Router from "express-promise-router";
import { AddPassengerSchedule } from "../Controllers/PassengerScheduleController";

const router = Router();

router.post(
  "/add-passenger-schedule",
  AddPassengerSchedule,
  async (req, res, next) => {}
);

export default router;
