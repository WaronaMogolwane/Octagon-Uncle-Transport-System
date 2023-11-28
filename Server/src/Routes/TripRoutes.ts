import { Router } from "express";
import {
  AddTrip,
  GetTrip,
  GetTripsForBusiness as GetTripsForBusiness,
  GetTripsForParent,
  UpdateTripDetails,
} from "../Controllers/TripController";

const router = Router();

router.post("/add-trip", AddTrip, async (req, res, next) => {});

router.post("/get-trip", GetTrip, async (req, res, next) => {});

router.post(
  "/get-trips-for-business",
  GetTripsForBusiness,
  async (req, res, next) => {}
);
router.post(
  "/get-trips-for-parent",
  GetTripsForParent,
  async (req, res, next) => {}
);

router.patch("/update-trip", UpdateTripDetails, async (req, res, next) => {});

export default router;
