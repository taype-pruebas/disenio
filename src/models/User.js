import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const userEntity = () => {
  const userSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    user_lastname: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      validate: isEmail,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_active: {
      type: Boolean,
      default: true,
    },
  });

  return mongoose.models.Users || mongoose.model("Users", userSchema);
};

export const User = userEntity();
