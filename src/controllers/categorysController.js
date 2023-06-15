import {
  createCategoryOrm,
  deleteCategoryOrm,
  getAllCategorysOrm,
  updateCategoryOrm,
} from "../orm/categorysOrm";
import { codeError } from "../utils";

const categorysController = () => {
  const getCategory = async () => {
    return await getAllCategorysOrm();
  };

  const createCategory = async (category) => {
    if (!category.category_name || !category.category_description) {
      return {
        status_code: codeError,
        message: "No cumple con las condiciones",
      };
    }

    return await createCategoryOrm(category);
  };
  const updateCategory = async (category) => {
    if (
      !category.category_name ||
      !category.category_description ||
      !category._id
    ) {
      return {
        status_code: codeError,
        message: "No cumple con las condiciones",
      };
    }

    return await updateCategoryOrm(category);
  };

  const deleteCategory = async (id) => {
    if (!id) {
      return {
        status_code: codeError,
        message: "Es necesario proveer un id",
      };
    }

    return await deleteCategoryOrm(id);
  };

  return { getCategory, createCategory, updateCategory, deleteCategory };
};

export default categorysController;
