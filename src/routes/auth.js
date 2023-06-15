import express from "express";
import bodyParser from "body-parser";
import authController from "../controllers/authController";

const authRouter = express.Router();
const jsonParser = bodyParser.json();

const { createUser, loginUser } = authController();

authRouter
  .route("/register")
  .get((req, res) => {
    res.status(200).json({ message: "Estas es la seccion de register" });
  })
  .post(jsonParser, async (req, res) => {
    const user = req?.body;

    /**
     * Enviar
     * @user_name String
     * @user_lastname String
     * @user_email String
     * @user_password String
     */
    const response = await createUser(user);

    return res.status(response.status_code).json({ ...response });
  });

authRouter.route("/login").post(jsonParser, async (req, res) => {
  const user = req?.body;
  /**
   * Enviar
   * @user_email String
   * @user_password String
   */
  const response = await loginUser(user);

  return res.status(response.status_code).json({ ...response });
});

export default authRouter;
