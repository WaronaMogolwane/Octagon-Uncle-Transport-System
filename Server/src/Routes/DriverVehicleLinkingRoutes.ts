import Router from "express-promise-router";
import { GetDriverId } from "../Controllers/DriverVehicleLinkingController";

const router = Router();

router.get("/get-driver-id", GetDriverId, async (req, res, next) => {});

export default router;
