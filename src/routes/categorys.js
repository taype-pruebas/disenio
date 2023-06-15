import bodyParser from "body-parser";
import express from "express";
import categorysController from "../controllers/categorysController";
import { verifyToken } from "../utils/verifytoken";

const categorysRouter = express.Router();
const jsonParser = bodyParser.json();

const { createCategory, deleteCategory, getCategory, updateCategory } =
  categorysController();

categorysRouter
  .route("/")
  .get(async (req, res) => {
    const response = await getCategory();

    return res.status(response.status_code).json({ ...response });
  })
  .post(jsonParser, verifyToken, async (req, res) => {
    const category = req?.body;

    const response = await createCategory(category);

    return res.status(response.status_code).json({ ...response });
  })
  .put(jsonParser, verifyToken, async (req, res) => {
    const category = req?.body;

    const response = await updateCategory(category);

    return res.status(response.status_code).json({ ...response });
  })
  .delete(jsonParser, async (req, res) => {
    const { _id } = req?.body;

    const response = await deleteCategory(_id);

    return res.status(response.status_code).json({ ...response });
  });

export default categorysRouter;
