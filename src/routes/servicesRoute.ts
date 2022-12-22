import { Router } from "express";
import servicesControllers from "../controllers/servicesControllers";

const router = Router();


router.post('/add', servicesControllers.addService);
router.put('/update', servicesControllers.updateService);
router.get('/:id', servicesControllers.getServiceById);  
router.get('/', servicesControllers.getServices);

export default router;