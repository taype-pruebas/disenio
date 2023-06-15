import { createUserOrm, loginUserOrm } from "../orm/authOrm";
import { codeError } from "../utils";

const authController = () => {
  const createUser = async (user) => {
    // console.log(user);
    if (!user.user_password && user.user_email) {
      return {
        status_code: codeError,
        message: "No cumple con las condiciones",
      };
    }
    return await createUserOrm(user);
  };

  const loginUser = async (user) => {
    // console.log(user);
    if (!user.user_password && user.user_email) {
      return {
        status_code: codeError,
        message: "Campos no completos",
      };
    }

    return await loginUserOrm(user);
  };

  return { createUser, loginUser };
};

export default authController;
