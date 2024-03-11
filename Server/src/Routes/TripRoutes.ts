import { Router } from "express";
import {
  AddTrip,
  GetTrip,
  GetPastTripsForParent,
  GetUpcomingTripsForParent,
  UpdateTripDetail,
  UpdateTripPassengerStatus,
  UpdateTripEndTrip,
  GetPastTripsForDriver,
  GetUpcomingTripsForDriver,
  UpdateTripDropOffTime,
  UpdateTripPickUpTime,
  GetPastTripsForBusiness,
  GetUpcomingTripsForBusiness,
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
  "/get-past-trip-for-driver",
  GetPastTripsForDriver,
  async (req, res, next) => {}
);

router.post(
  "/get-past-trip-for-business",
  GetPastTripsForBusiness,
  async (req, res, next) => {}
);

router.post(
  "/get-upcoming-trip-for-driver",
  GetUpcomingTripsForDriver,
  async (req, res, next) => {}
);

router.post(
  "/get-upcoming-trips-for-parent",
  GetUpcomingTripsForParent,
  async (req, res, next) => {}
);

router.post(
  "/get-upcoming-trips-for-business",
  GetUpcomingTripsForBusiness,
  async (req, res, next) => {}
);

router.patch(
  "/update-passenger-status",
  UpdateTripPassengerStatus,
  async (req, res, next) => {}
);

router.patch(
  "/update-trip-pickup-time",
  UpdateTripPickUpTime,
  async (req, res, next) => {}
);

router.patch(
  "/update-trip-dropoff-time",
  UpdateTripDropOffTime,
  async (req, res, next) => {}
);

router.patch("/end-trip", UpdateTripEndTrip, async (req, res, next) => {});

router.patch("/update-trip", UpdateTripDetail, async (req, res, next) => {});

export default router;
