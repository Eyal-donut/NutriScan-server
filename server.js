import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import usersRouter from "./routes/usersRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://nutriscan.netlify.app'],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Body parser middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to products scanner API",
  });
});

app.use("/api/v1/products-scanner/users", usersRouter);
app.use("/api/v1/products-scanner/products", productsRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;
connectDB().then(() => {
  server = app.listen(
    PORT,
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
