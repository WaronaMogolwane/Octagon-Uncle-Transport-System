import Router from "express-promise-router";
import {
  AddPassenger,
  GetAllBusinessPassenger,
  GetAllUserPassenger,
  GetPassenger,
  UpdatePassenger,
} from "../Controllers/PassengerController";

const router = Router();

router.post("/create-passenger", AddPassenger, async (req, res, next) => {});

router.get("/get-passenger", GetPassenger, async (req, res, next) => {});

router.patch(
  "/update-passenger",
  UpdatePassenger,
  async (req, res, next) => {}
);

router.get(
  "/get-all-passenger-user",
  GetAllUserPassenger,
  async (req, res, next) => {}
);

router.get(
  "/get-all-passenger-business",
  GetAllBusinessPassenger,
  async (req, res, next) => {}
);

// router.delete("/delete-account", (req, res) => { });
// router.patch("/edit-profile", (req, res) => { });
// router.get("/profile", (req, res) => { });

export default router;
