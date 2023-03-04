import { Router } from "express";

import ServiceController from "../controllers/ServicesController";


const router = Router();


router.post("/add", ServiceController.addService);
router.put("/update/:id", ServiceController.updateService);
router.delete("/delete/:id", ServiceController.deleteService);

router.get("/:id", ServiceController.getService);
router.get("/", ServiceController.getServices);


export default router;