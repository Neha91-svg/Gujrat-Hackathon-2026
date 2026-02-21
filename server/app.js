import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ALL ROUTES */
app.use("/api", routes);

/* ERROR HANDLER — always last */
app.use(errorMiddleware);

export default app;