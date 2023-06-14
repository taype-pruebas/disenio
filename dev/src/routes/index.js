import express from "express";

const server = express();
const rootRouter = express.Router();

// rutas
import authRouter from "./auth.js";

rootRouter.get("/", (req, res) => {
  res.status(200).json({ message: "estas en la pagina principal" });
});

server.use("/", rootRouter);
server.use("/auth", authRouter);

export default server;
