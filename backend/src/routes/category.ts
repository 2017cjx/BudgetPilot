import { Router } from "express";
import { createCategory, getAllCategories } from "../handlers/categories";

const router = Router();

router.post("/create", createCategory);
router.get('/', getAllCategories);

export default router;