import { Categorys } from "../models/Categorys";
import { codeError, codeErrorInternal, codeSuccess } from "../utils";

const categorysModel = Categorys;

export const getAllCategorysOrm = async () => {
  try {
    let data;
    let error;

    await categorysModel
      .find()
      .then((categorys) => (data = categorys))
      .catch((err) => {
        error = err._error;
      });

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    return {
      status_code: codeSuccess,
      message: "categorias obtenido correctamente correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Error internal",
    };
  }
};

export const createCategoryOrm = async (category) => {
  try {
    let data;
    let error;

    await categorysModel
      .findOne({
        category_name: { $regex: new RegExp(category.category_name, "i") },
      })
      .then((category) => (data = category))
      .catch((err) => {
        error = err._error;
      });

    if (data) {
      return {
        status_code: codeError,
        message: "Ya existe una categoria",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await categorysModel
      .insertMany([{ ...category }])
      .then((category) => (data = category))
      .catch((err) => {
        throw new Error(err || "No se pudo crear categoria");
      });

    return {
      status_code: codeSuccess,
      message: "categoria creado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};

export const updateCategoryOrm = async (category) => {
  try {
    let data;
    let error;

    await categorysModel
      .findById(category._id)
      .then((category) => (data = category))
      .catch((err) => {
        error = err._error;
      });

    if (!data) {
      return {
        status_code: codeError,
        message: "Estas actualizando una categoria que no existe",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await categorysModel
      .findByIdAndUpdate(
        category._id,
        {
          category_name: category.category_name,
          category_description: category.category_description,
        },
        { new: true }
      )
      .then((category) => (data = category))
      .catch((err) => {
        throw new Error(err._error);
      });

    return {
      status_code: codeSuccess,
      message: "categoria actualizado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};

export const deleteCategoryOrm = async (id) => {
  try {
    let data;
    let error;

    await categorysModel
      .findById(id)
      .then((category) => (data = category))
      .catch((err) => {
        error = err._error;
      });

    if (!data) {
      return {
        status_code: codeError,
        message: "Estas eliminando una categoria que no existe",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await categorysModel
      .findByIdAndDelete(id)
      .then((category) => (data = category))
      .catch((err) => {
        throw new Error(err._error);
      });

    return {
      status_code: codeSuccess,
      message: "categoria eliminado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};
