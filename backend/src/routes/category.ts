import { Router } from "express";
import { createCategory } from "../handlers/categories";

const router = Router();

router.post("/category", createCategory);

export default router;