
import Router from "express-promise-router";
import { SendPushNotificationToAll, SendPushNotificationToDevice } from "../Controllers/PushNotificationController";
const router = Router();

router.post("/send-to-device", SendPushNotificationToDevice, async (req, res, next) => {
});
router.post("/send-to-all", SendPushNotificationToAll, async (req, res, next) => {
});


export default router;
