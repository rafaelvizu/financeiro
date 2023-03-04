import { Router } from "express";


const router = Router();


router.post("/add");
router.put("/update/:id");
router.delete("/delete/:id");

router.get("/:id");
router.get("/");