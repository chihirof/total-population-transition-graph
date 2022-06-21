import axios from "axios";
import { PrefecturePopulation } from "../types";

import { getApiKey } from "./apiKey";
import {
  API_ENDPOINT,
  API_POPULATION_PATH,
  API_POPULATION_PARAM_DEFAULT_CITYCODE,
} from "./constants";

export const getPopulation = async (
  prefCode: number
): Promise<PrefecturePopulation> => {
  const response = await axios.get(`${API_ENDPOINT}${API_POPULATION_PATH}`, {
    headers: { "X-API-KEY": getApiKey() },
    params: {
      prefCode,
      cityCode: API_POPULATION_PARAM_DEFAULT_CITYCODE,
    },
  });

  if (response.data.result === undefined) {
    const { statusCode, message } = response.data;
    throw new Error(`statusCode: ${statusCode} / message: ${message}`);
  }

  return {
    prefCode,
    populations: response.data.result.data.find(
      (d: any) => d.label === "総人口"
    ).data,
  };
};
