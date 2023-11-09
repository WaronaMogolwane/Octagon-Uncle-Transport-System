import Router from "express-promise-router";
import { AddPassenger } from "../Controllers/PassengerController";

const router = Router();

router.post("/create-passenger", AddPassenger, async (req, res, next) => {});

// router.delete("/delete-account", (req, res) => { });
// router.patch("/edit-profile", (req, res) => { });
// router.get("/profile", (req, res) => { });

export default router;
