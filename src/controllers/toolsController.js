import {
  createToolsOrm,
  deleteToolOrm,
  getAlltoolsOrm,
  updateToolOrm,
} from "../orm/toolsOrm";
import { codeError } from "../utils";

const toolsController = () => {
  const getTools = async () => {
    return await getAlltoolsOrm();
  };

  const createTool = async (tool) => {
    if (!tool.tool_name || !tool.tool_description) {
      return {
        status_code: codeError,
        message: "No cumple con las condiciones",
      };
    }

    return await createToolsOrm(tool);
  };
  const updateTools = async (tool) => {
    if (!tool.tool_name || !tool.tool_description || !tool._id) {
      return {
        status_code: codeError,
        message: "No cumple con las condiciones",
      };
    }

    return await updateToolOrm(tool);
  };

  const deleteTool = async (id) => {
    if (!id) {
      return {
        status_code: codeError,
        message: "Es necesario proveer un id",
      };
    }

    return await deleteToolOrm(id);
  };

  return { getTools, createTool, updateTools, deleteTool };
};

export default toolsController;
