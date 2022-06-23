import React from "react";
import axios from "axios";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import Main from "../src/components/page/Main/Main";
import {
  API_ENDPOINT,
  API_PREFECTURES_PATH,
  API_POPULATION_PATH,
} from "../src/api/constants";

jest.mock("axios");
jest.mock("../src/api/apiKey");

const spyLogError = jest.spyOn(console, "error");

const prefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
];
const prefectureResponse = {
  data: {
    message: null,
    result: prefectures,
  },
};

const populations = [
  { year: 1960, value: 1 },
  { year: 1965, value: 10 },
];
const populationResponse = {
  data: {
    message: null,
    result: {
      boundaryYear: 2015,
      data: [
        {
          label: "総人口",
          data: populations,
        },
        {
          label: "年少人口",
          data: [
            { year: 1960, value: 1 },
            { year: 1965, value: 10 },
          ],
        },
      ],
    },
  },
};

const mockAxiosGet = () => {
  axios.get.mockImplementation((path) => {
    if (path === `${API_ENDPOINT}${API_PREFECTURES_PATH}`) {
      return Promise.resolve(prefectureResponse);
    }
    if (path === `${API_ENDPOINT}${API_POPULATION_PATH}`) {
      return Promise.resolve(populationResponse);
    }
    return null;
  });
};

describe("人口グラフの表示", () => {
  async function displayPrefectures() {
    render(<Main />);
    await waitFor(() => screen.getByText(prefectures[0].prefName));
  }

  afterEach(() => {
    axios.get.mockReset();
    spyLogError.mockClear();
  });

  it("チェックボックスを選択したら、選択した都道府県のデータが表示される", async () => {
    mockAxiosGet();

    await displayPrefectures();

    fireEvent.click(screen.getByText(prefectures[0].prefName));
    await waitFor(() => screen.getByText(populations[0].value));
    expect(screen.getByText(populations[0].value)).toBeTruthy();
    expect(screen.getByText(populations[1].value)).toBeTruthy();
  });

  it.todo("チェックボックスの選択を外したら、選択した都道府県のデータが消える");

  it.todo(
    "人口データ取得に失敗した場合(axiosのエラー)、エラーログが表示される"
  );

  it.todo(
    "人口データ取得に失敗した場合(RESASのエラー)、エラーログが表示される"
  );
});
