//import { Router } from "express";
import Router from 'express-promise-router'
const router = Router();

router.delete("/delete-account", (req, res) => { });
router.patch("/edit-profile", (req, res) => { });
router.get("/profile", (req, res) => { });

export default router;
