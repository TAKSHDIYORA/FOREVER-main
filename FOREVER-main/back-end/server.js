import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";

// Initialize App
const app = express();

// Connect Cloudinary
connectCloudinary();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://forever-admin-zeta-one.vercel.app", // Admin frontend
      "https://forever-frontend.vercel.app",       // Client site (if any)
      "http://localhost:3000",                     // Local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// Manually handle preflight OPTIONS
app.options("*", cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("✅ API is working perfectly!");
});

// ✅ Export app instead of app.listen()
export default app;
