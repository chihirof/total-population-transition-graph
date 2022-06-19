import axios from "axios";

import { Prefectures } from "../types";
import { getApiKey } from "./apiKey";
import { API_ENDPOINT, API_PREFECTURES_PATH } from "./constants";

export const getPrefectures = async (): Promise<Prefectures> => {
  const response = await axios.get(`${API_ENDPOINT}${API_PREFECTURES_PATH}`, {
    headers: { "X-API-KEY": getApiKey() },
  });

  if (response.data.result === undefined) {
    const { statusCode, message } = response.data;
    throw new Error(`statusCode: ${statusCode} / message: ${message}`);
  }

  return response.data.result;
};
