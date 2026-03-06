import express from "express";
import { generateAllocation,getStudentSchedule,getAllAllocations } from "../controllers/allocation.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();


router.get("/student/:hallTicket", getStudentSchedule);

router.post("/generate", verifyAdmin, generateAllocation);
router.get("/all", verifyAdmin, getAllAllocations);

export default router;