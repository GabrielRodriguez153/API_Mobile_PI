import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import farmRoutes from "./routes/farm.js";
import analysisRoutes from "./routes/analysis.js";
import occurrenceRoutes from "./routes/occurrence.js";
import faqRoutes from "./routes/faq.js";
import sectorStatsRoutes from "./routes/sectorstats.js";
import iaRoutes from "./routes/ia.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/public", express.static("public"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/farms", farmRoutes);
app.use("/analysis", analysisRoutes);
app.use("/occurrence", occurrenceRoutes);
app.use("/faq", faqRoutes);
app.use("/sector-stats", sectorStatsRoutes);
app.use("/ia", iaRoutes);

app.get("/", (req, res) => res.send("API está no Ar!"));

export default app;
