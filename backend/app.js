import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Connect (or reuse the cached connection) before any route that touches a
// model. Applied per-router so the health and PayPal-config endpoints stay
// reachable even when the database is down.
const dbReady = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
};

app.use("/api/products", dbReady, productRouter);
app.use("/api/users", dbReady, userRouter);
app.use("/api/orders", dbReady, orderRouter);
app.use("/api/upload", dbReady, uploadRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/api", (req, res) => {
  res.json({ message: "API is running...." });
});

app.use(notFound);
app.use(errorHandler);

export default app;
