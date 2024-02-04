import { Router } from "express";
import {
  AddTrip,
  GetTrip,
  GetPastTripsForParent,
  GetUpcomingTripsForParent,
  UpdateTripDetails,
  UpdateTripPassengerStatus,
  UpdateTripEndTrip,
} from "../Controllers/TripController";

const router = Router();

router.post("/add-trip", AddTrip, async (req, res, next) => {});

router.post("/get-trip", GetTrip, async (req, res, next) => {});

router.post(
  "/get-past-trip-for-parent",
  GetPastTripsForParent,
  async (req, res, next) => {}
);

router.post(
  "/get-upcoming-trips-for-parent",
  GetUpcomingTripsForParent,
  async (req, res, next) => {}
);

router.patch(
  "/update-passenger-status",
  UpdateTripPassengerStatus,
  async (req, res, next) => {}
);

router.patch("/end-trip", UpdateTripEndTrip, async (req, res, next) => {});

router.patch("/update-trip", UpdateTripDetails, async (req, res, next) => {});

export default router;
