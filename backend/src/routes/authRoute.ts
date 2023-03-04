import { Router } from "express";

import AuthController from "../controllers/AuthController";
import { checkUnAuth, checkAuth } from "../helpers/authHelper";


const router = Router();


router.post("/login", checkUnAuth, AuthController.login);
router.post("/register", checkUnAuth, AuthController.register);
router.get("/logout", checkAuth, AuthController.logout);


export default router;