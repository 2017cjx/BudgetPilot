import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById } from "../handlers/categories";

const router = Router();

router.post("/create", createCategory);
router.get('/', getAllCategories);
router.get("/:id", getCategoryById);

export default router;