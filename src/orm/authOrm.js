import { User } from "../models/User";
import { codeError, codeErrorInternal, codeSuccess } from "../utils";
import bcrypt from "bcrypt";

const userModel = User;

export const createUserOrm = async (user) => {
  try {
    const saltRounds = 10;
    const passwordEncript = await bcrypt.hash(user.user_password, saltRounds);
    // console.log(passwordEncript);}

    let data;
    let error;

    await userModel
      .findOne({ user_email: user.user_email })
      .then((user) => (data = user))
      .catch((err) => {
        error = err;
      });

    if (data) {
      return {
        status_code: codeError,
        message: "Email ya esta registrado",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await userModel
      .create({ ...user, user_password: passwordEncript })
      .then((user) => (data = user))
      .catch((err) => {
        throw new Error(err || "No se pudo crear usuario");
      });

    return {
      status_code: codeSuccess,
      message: "Usuario creado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};
