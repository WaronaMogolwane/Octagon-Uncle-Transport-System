
import Router from "express-promise-router";
import { SendPushNotificationToDevice } from "../Controllers/PushNotificationController";
const router = Router();

router.post("/send-to-device", SendPushNotificationToDevice, async (req, res, next) => {
});


export default router;
