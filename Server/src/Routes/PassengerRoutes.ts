import Router from "express-promise-router";
import {
  AddPassenger,
  GetPassengersByBusiness,
  GetPassengersByParent,
  GetPassenger,
  UpdatePassengerDetail,
  UpdatePassengerIsAssigned,
  GetAllPassengersByBusiness,
  GetPendingPassengersByBusiness,
} from "../Controllers/PassengerController";

const router = Router();

router.post("/add-passenger", AddPassenger, async (req, res, next) => {});

router.post("/get-passenger", GetPassenger, async (req, res, next) => {});

router.patch(
  "/update-passenger-details",
  UpdatePassengerDetail,
  async (req, res, next) => {}
);

router.patch(
  "/update-is-assigned",
  UpdatePassengerIsAssigned,
  async (req, res, next) => {}
);

router.get(
  "/get-client-passengers",
  GetPassengersByParent,
  async (req, res, next) => {}
);

router.get(
  "/get-business-passengers",
  GetPassengersByBusiness,
  async (req, res, next) => {}
);

router.get(
  "/get-all-passengers-for-business",
  GetAllPassengersByBusiness,
  async (req, res, next) => {}
);

router.get(
  "/get-pending-passengers-for-business",
  GetPendingPassengersByBusiness,
  async (req, res, next) => {}
);

export default router;
