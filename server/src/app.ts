import express from "express";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./cors";
import router from "./router";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors(corsConfig));
  app.use(morgan("tiny"));

  app.get("/", router);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  return app;
}
