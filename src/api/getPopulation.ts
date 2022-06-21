import axios from "axios";
import { Populations } from "../types";

import { getApiKey } from "./apiKey";
import { API_ENDPOINT, API_POPULATION_PATH } from "./constants";

export const getPopulation = async (prefCode: number): Promise<Populations> => {
  const response = await axios.get(`${API_ENDPOINT}${API_POPULATION_PATH}`, {
    headers: { "X-API-KEY": getApiKey() },
    params: {
      prefCode,
      cityCode: "-",
    },
  });

  if (response.data.result === undefined) {
    const { statusCode, message } = response.data;
    throw new Error(`statusCode: ${statusCode} / message: ${message}`);
  }

  return response.data.result.data.find((d: any) => d.label === "総人口").data;
};
