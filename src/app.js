import express from "express";
import cors from "cors";

import allocationRoutes from "./routes/allocation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import sRoutes from "./routes/student.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/allocation", allocationRoutes);
app.use("/api/auth/admin", authRoutes);
app.use("/api/student", sRoutes);



export default app;