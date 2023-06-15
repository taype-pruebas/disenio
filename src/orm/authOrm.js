import { User } from "../models/User";
import { codeError, codeErrorInternal, codeSuccess } from "../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginUserOrm = async (user) => {
  try {
    let data;
    let error;

    await userModel
      .findOne({ user_email: user.user_email })
      .then((user) => (data = user))
      .catch((err) => {
        error = err;
      });

    if (!data) {
      return {
        status_code: codeError,
        message: "Aun no esta registrado.",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    let validPassword = await bcrypt.compare(
      user.user_password,
      data.user_password
    );

    if (!validPassword) {
      return {
        status_code: codeError,
        message: "La contraseña no es válida",
      };
    }

    // Generar jwt
    const token = jwt.sign(
      {
        user_email: data.user_email,
      },
      "Encriptador",
      {
        expiresIn: "24h",
      }
    );

    return {
      status_code: codeSuccess,
      data: { ...data, user_token: token },

      message: "Inicio de sesion exitoso",
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};
