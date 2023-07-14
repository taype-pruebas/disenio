import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // url base

const api = axios.create({
  baseURL: API_BASE_URL,
});

const makeRequest = async (endpoint, method = "GET", data = null) => {
  try {
    // Peticion a la base de datos
    const response = await api.request({
      url: endpoint,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    throw new error();
  }
};

export default makeRequest;
