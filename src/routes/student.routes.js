import express from "express";
import { createStudent } from "../controllers/student.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyAdmin, createStudent);

export default router;