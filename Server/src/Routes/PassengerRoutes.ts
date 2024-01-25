import Router from "express-promise-router";
import {
  AddPassenger,
  GetPassengersByBusiness,
  GetPassengersByParent,
  GetPassenger,
  UpdatePassengerDetail,
} from "../Controllers/PassengerController";

const router = Router();

router.post("/add-passenger", AddPassenger, async (req, res, next) => {});

router.post("/get-passenger", GetPassenger, async (req, res, next) => {});

router.patch(
  "/update-passenger-details",
  UpdatePassengerDetail,
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

// router.delete("/delete-account", (req, res) => { });
// router.patch("/edit-profile", (req, res) => { });
// router.get("/profile", (req, res) => { });

export default router;
