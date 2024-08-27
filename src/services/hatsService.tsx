import { api, isAxiosError } from "../utils/api";

interface ErrorResponse {
  data: {
    detail?: string;
  };
  status?: number;
  statusText?: string;
}

export const getAllCollections = async () => {
  try {
    const response = await api.get("/collections/get_all/");
    return {
      success: true,
      data: response.data,
      message: "Coleções obtidas com sucesso.",
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

export const createNewHat = async (payload: any) => {
  try {
    const response = await api.post("/hats/create/", payload);
    return {
      success: true,
      data: response.data,
      message: "Coleções obtidas com sucesso.",
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

export const getAllHats = async () => {
  try {
    const response = await api.get("/hats/get_all/");
    return {
      success: true,
      data: response.data,
      message: "Chapeus obtidas com sucesso.",
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
