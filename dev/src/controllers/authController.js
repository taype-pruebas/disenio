import { createUserOrm } from "../orm/authOrm"
import { codeError } from "../utils"

const authController = () => {
    const createUser = async (user) => {
        // console.log(user);
        if(!user.user_password && user.user_email) {
            return {
                status_code: codeError,
                message: "No cumple con las condiciones"
            }
        }
        return await createUserOrm(user)
    }

    return {createUser}
}

export default authController