import { Categorys } from "../models/Categorys";
import { Tools } from "../models/Tools";
import { codeError, codeErrorInternal, codeSuccess } from "../utils";

const toolsModel = Tools;
const Category = Categorys;

export const getAlltoolsOrm = async () => {
  try {
    let error;

    await toolsModel
      .find()
      .then((tools) => (data = tools))
      .catch((err) => {
        error = err._error;
      });

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    const prueba = await toolsModel
      .aggregate([
        {
          $lookup: {
            from: "categorys",
            localField: "tool_category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $lookup: {
            from: "users",
            localField: "user_created",
            foreignField: "_id",
            as: "user_created",
          },
        },
        {
          $unwind: "$user_created",
        },
        {
          $group: {
            _id: "$category.category_name",
            category_description: {
              $first: "$category.category_description",
            },
            category_name: {
              $first: "$category.category_name",
            },
            category_tools: {
              $push: {
                _id: "$_id",
                tool_name: "$tool_name",
                tool_description: "$tool_description",
                tool_image: "$tool_image",
                tool_link: "$tool_link",
                tool_ranking: "$tool_ranking",
                user_created: {
                  user_name: "$user_created.user_name",
                  user_lastname: "$user_created.user_lastname",
                  user_email: "$user_created.user_email",
                },
              },
            },
          },
        },
      ])
      .exec()
      .then((result) => {
        const data = {};

        result.forEach((category) => {
          const categoryName = category._id;
          data[categoryName] = {
            category_description: category.category_description,
            category_name: category.category_name,
            category_tools: category.category_tools,
          };
        });

        const response = {
          status_code: codeSuccess,
          message: "Herramientas obtenidas correctamente.",
          data: [data],
        };

        // console.log(response);

        return response;
      })
      .catch((error) => {
        throw new Error("Error al obtener las herramientas:", error);
      });

    return prueba;
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Error internal",
    };
  }
};

export const createToolsOrm = async (tool) => {
  try {
    let data;
    let error;

    await toolsModel
      .findOne({
        category_name: { $regex: new RegExp(tool.tool_name, "i") },
      })
      .then((tool) => (data = tool))
      .catch((err) => {
        error = err._error;
      });

    if (data) {
      return {
        status_code: codeError,
        message: "Ya existe una herramienta",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await toolsModel
      .insertMany([{ ...tool }])
      .then((category) => (data = category))
      .catch((err) => {
        throw new Error(err || "No se pudo crear herramienta");
      });

    return {
      status_code: codeSuccess,
      message: "herramienta creado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};

export const updateToolOrm = async (tool) => {
  try {
    let data;
    let error;

    await toolsModel
      .findById(tool._id)
      .then((tool) => (data = tool))
      .catch((err) => {
        error = err._error;
      });

    if (!data) {
      return {
        status_code: codeError,
        message: "Estas actualizando una herramienta que no existe",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    const copiedObject = { ...tool };
    delete copiedObject._id;

    console.log(copiedObject);

    // return {
    //   status_code: codeSuccess,
    //   message: "Herramienta actualizado correctamente",
    //   // data,
    // };

    await toolsModel
      .findByIdAndUpdate(
        tool._id,
        {
          ...copiedObject,
        },
        { new: true }
      )
      .then((tool) => (data = tool))
      .catch((err) => {
        throw new Error(err._error);
      });

    return {
      status_code: codeSuccess,
      message: "Herramienta actualizado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};

export const deleteToolOrm = async (id) => {
  try {
    let data;
    let error;

    await toolsModel
      .findById(id)
      .then((tool) => (data = tool))
      .catch((err) => {
        error = err._error;
      });

    if (!data) {
      return {
        status_code: codeError,
        message: "Estas eliminando una herramienta que no existe",
      };
    }

    if (error) {
      return {
        status_code: codeErrorInternal,
        message: error || "Internal error",
      };
    }

    await toolsModel
      .findByIdAndDelete(id)
      .then((tool) => (data = tool))
      .catch((err) => {
        throw new Error(err._error);
      });

    return {
      status_code: codeSuccess,
      message: "Herramienta eliminado correctamente",
      data,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error || "Internal error",
    };
  }
};
