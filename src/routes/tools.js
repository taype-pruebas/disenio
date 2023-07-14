import bodyParser from "body-parser";
import express from "express";
import { verifyToken } from "../utils/verifytoken";
import toolsController from "../controllers/toolsController";

const toolRouter = express.Router();
const jsonParser = bodyParser.json();

const { createTool, deleteTool, getTools, updateTools } = toolsController();

toolRouter
  .route("/")
  .get(async (req, res) => {
    const response = await getTools();

    return res.status(response.status_code).json({ ...response });
  })
  .post(jsonParser, verifyToken, async (req, res) => {
    const tool = req?.body;

    const response = await createTool(tool);

    return res.status(response.status_code).json({ ...response });
  })
  .put(jsonParser, verifyToken, async (req, res) => {
    const tool = req?.body;

    const response = await updateTools(tool);

    return res.status(response.status_code).json({ ...response });
  })
  .delete(jsonParser, async (req, res) => {
    const { _id } = req?.body;

    const response = await deleteTool(_id);

    return res.status(response.status_code).json({ ...response });
  });

export default toolRouter;
