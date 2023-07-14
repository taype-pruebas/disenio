import mongoose from "mongoose";
const toolIntity = () => {
  const toolSchema = new mongoose.Schema({
    tool_name: {
      type: String,
      required: true,
    },
    tool_description: {
      type: String,
      required: true,
    },
    tool_image: {
      type: String,
      required: true,
    },
    tool_link: {
      type: String,
      required: true,
    },
    tool_ranking: {
      type: Number,
      default: null,
    },
    tool_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorys",
    },
    user_created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  });

  return mongoose.models.Tools || mongoose.model("Tools", toolSchema);
};

export const Tools = toolIntity();