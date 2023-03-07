import { Router } from "express";

import AuthController from "../controllers/AuthController";
import { checkUnAuth, checkAuth } from "../helpers/authHelper";
import upload from "../helpers/uploadImagesHelper";


const router = Router();


router.post("/login", checkUnAuth, AuthController.login);
router.post("/register", checkUnAuth, upload.single('user-img'), AuthController.register);
router.get("/logout", checkAuth, AuthController.logout);
router.get("/check", checkAuth, AuthController.getUser);


export default router;