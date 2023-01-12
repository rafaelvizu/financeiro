import { Router } from "express";
import categoryController from "../controllers/categoryController";
const router = Router();

router.delete('/delete', categoryController.deleteCategory);
router.put('/update', categoryController.updateCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/add', categoryController.addCategory);
router.get('/', categoryController.getCategories);


export default router;