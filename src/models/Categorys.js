import mongoose from "mongoose";

const categoryIntity = () => {
  const categorySchema = new mongoose.Schema({
    category_name: {
      type: String,
      required: true,
    },
    category_description: {
      type: String,
      required: true,
    },
  });

  return (
    mongoose.models.Categorys || mongoose.model("Categorys", categorySchema)
  );
};

export const Categorys = categoryIntity();
