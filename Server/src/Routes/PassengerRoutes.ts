import Router from "express-promise-router";
import {
  AddPassenger,
  GetPassengersByParent,
  GetPassenger,
  UpdatePassengerDetail,
  UpdatePassengerIsAssigned,
  GetAllPassengersByBusiness,
  GetPendingPassengersByBusiness,
  DeletePassenger,
  DeletePassengerRequest,
  GetActivePassengersByParent,
  GetPassengersActiveByBusiness,
  GetPassengersDropdownByBusiness,
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
  GetPassengersDropdownByBusiness,
  async (req, res, next) => {}
);

router.get(
  "/get-business-active-passengers",
  GetPassengersActiveByBusiness,
  async (req, res, next) => {}
);

router.get(
  "/get-active-parent-passengers",
  GetActivePassengersByParent,
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

router.delete(
  "/delete-passenger",
  DeletePassenger,
  async (req, res, next) => {}
);

router.delete(
  "/request-delete-passenger",
  DeletePassengerRequest,
  async (req, res, next) => {}
);
export default router;
