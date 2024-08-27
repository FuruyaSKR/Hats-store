import { api, isAxiosError } from "../utils/api";

interface ErrorResponse {
  data: {
    detail?: string;
  };
  status?: number;
  statusText?: string;
}

export const createNewUser = async (payload: any) => {
  try {
    const response = await api.post("/users/create/", payload);
    return {
      success: true,
      data: response.data,
      message: "Usuario criado com sucesso.",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorResponse = error.response as ErrorResponse | undefined;
      if (errorResponse && errorResponse.data) {
        return {
          success: false,
          status: errorResponse.status,
          message: errorResponse.data.detail,
          data: [],
        };
      }
    }
    return {
      success: false,
      status: 500,
      message: "Erro ao criar um usuario.",
      data: [],
    };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users/users");
    return {
      success: true,
      data: response.data,
      message: "Usuario criado com sucesso.",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorResponse = error.response as ErrorResponse | undefined;
      if (errorResponse && errorResponse.data) {
        return {
          success: false,
          status: errorResponse.status,
          message: errorResponse.data.detail,
          data: [],
        };
      }
    }
    return {
      success: false,
      status: 500,
      message: "Erro ao criar um usuario.",
      data: [],
    };
  }
};
