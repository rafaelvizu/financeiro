import { Router } from "express";

import ClientsController from "../controllers/ClientsController";

const router = Router();

router.put('/update/:id', ClientsController.updateClient);
router.delete('/delete/:id', ClientsController.deleteClient);
router.post('/create', ClientsController.createClient);

router.get('/:id', ClientsController.getClient);
router.get('/', ClientsController.getClients);


export default router;


