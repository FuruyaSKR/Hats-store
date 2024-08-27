import { api, isAxiosError } from "../utils/api";

interface ErrorResponse {
  data: {
    detail?: string;
  };
  status?: number;
  statusText?: string;
}

export const createNewCollection = async (payload: any) => {
  try {
    const response = await api.post("/collections/create/", payload);
    return {
      success: true,
      data: response.data,
      message: "Nova coleção criada com sucesso",
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
      message: "Erro ao obter coleções.",
      data: [],
    };
  }
};

export const getAllCollection = async () => {
  try {
    const response = await api.get("/collections/get_all/");
    return {
      success: true,
      data: response.data,
      message: "Nova coleção criada com sucesso",
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
      message: "Erro ao obter coleções.",
      data: [],
    };
  }
};
