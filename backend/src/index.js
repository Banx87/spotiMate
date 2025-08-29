import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { cron } from "node-cron";
import fs from "fs";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/statistic.route.js";
import { v2 as cloudinary } from "cloudinary";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8000;

const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:8001",
		credentials: true,
	})
);

app.use(express.json());
app.use(clerkMiddleware()); // Add auth to req.object
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10 MB limit
		},
	})
);

// cron jobs
// DELETE TEMP FILES EVERY HOUR
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/statistics", statRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

// Error handler
app.use((err, req, res, next) => {
	console.error("Error:", err);
	res.status(500).json({
		message:
			process.env.NODE_ENV === "development"
				? err.message
				: "Internal Server Error",
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});
