import jwt from "jsonwebtoken";
import { codeError, codeErrorInternal } from ".";

const secret = "Encriptador";

export const verifyToken = (req, res, next) => {
  // comprobar cabecera de la peticion (x-access-token)
  let token = req.headers["x-access-token"];

  // comprobar si viene o no token
  if (!token) {
    return res.send(codeError).send({
      status_code: codeError,
      message: "No tienes permisos para usar",
    });
  }

  // verifcar el token obtenido
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        status_code: codeErrorInternal,
        message: "Errores internos al validar token",
      });
    }

    // en caso contrario ejecutar peticion
    next();
  });
};
