import Router from "express-promise-router";
import {
  AddPassenger,
  GetPassengersByBusiness,
  GetPassengersByPayer,
  GetPassenger,
  UpdatePassengerDetail,
} from "../Controllers/PassengerController";

const router = Router();

router.post("/add-passenger", AddPassenger, async (req, res, next) => {});

router.get("/get-passenger", GetPassenger, async (req, res, next) => {});

router.patch(
  "/update-passenger-details",
  UpdatePassengerDetail,
  async (req, res, next) => {}
);

router.get(
  "/get-client-passengers",
  GetPassengersByPayer,
  async (req, res, next) => {}
);

router.get(
  "/get-business-passengers",
  GetPassengersByBusiness,
  async (req, res, next) => {}
);

// router.delete("/delete-account", (req, res) => { });
// router.patch("/edit-profile", (req, res) => { });
// router.get("/profile", (req, res) => { });

export default router;
