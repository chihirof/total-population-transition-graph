import React from "react";
import axios from "axios";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockConsoleMethod } from "./testUtiles";

import Main from "../src/components/page/Main/Main";
import {
  API_ENDPOINT,
  API_PREFECTURES_PATH,
  API_POPULATION_PATH,
} from "../src/api/constants";

jest.mock("axios");
jest.mock("../src/api/apiKey");

const ignoreMessages = [
  "statusCode: 403 / message: Forbidden.",
  "Error in axios",
];
// eslint-disable-next-line no-console
console.error = jest.fn(mockConsoleMethod(console.error, ignoreMessages));
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

describe("都道府県一覧", () => {
  afterEach(() => {
    axios.get.mockReset();
    spyLogError.mockClear();
  });

  it("画面表示時に都道府県データとチェックボックスが表示されている", async () => {
    axios.get.mockResolvedValue(prefectureResponse);

    render(<Main />);
    await waitFor(() => screen.getByText(prefectures[0].prefName));
    prefectures.forEach((pref) => {
      expect(screen.getByText(pref.prefName)).toBeTruthy();
      expect(screen.getByTestId(`TID-checkBox-${pref.prefCode}`)).toBeTruthy();
    });
  });

  it("都道府県データ取得に失敗した場合(axiosのエラー)、エラーログが表示される", async () => {
    const errorMessage = "Error in axios";
    axios.get.mockRejectedValue({
      message: errorMessage,
    });

    render(<Main />);
    await waitFor(() => expect(spyLogError).toHaveBeenCalledTimes(1));
    expect(spyLogError).toHaveBeenCalledWith(errorMessage);
  });

  it("都道府県データ取得に失敗した場合(RESASのエラー)、エラーログが表示される", async () => {
    axios.get.mockResolvedValue({
      data: {
        statusCode: 403,
        message: "Forbidden.",
        description: "",
      },
    });

    render(<Main />);
    await waitFor(() => expect(spyLogError).toHaveBeenCalledTimes(1));
    expect(spyLogError).toHaveBeenCalledWith(
      "statusCode: 403 / message: Forbidden."
    );
  });

  it("チェックボックスをチェックしたら、選択状態になること", async () => {
    mockAxiosGet();

    render(<Main />);
    await waitFor(() => screen.getByText(prefectures[0].prefName));

    const checkBoxTestId = `TID-checkBox-${prefectures[0].prefCode}`;
    const graphTestId = `TID-graph-${prefectures[0].prefCode}`;
    expect(screen.getByTestId(checkBoxTestId)).not.toBeChecked();

    fireEvent.click(screen.getByTestId(checkBoxTestId));
    await waitFor(() => {
      expect(screen.getAllByTestId(graphTestId)).toBeTruthy();
    });
    expect(screen.getByTestId(checkBoxTestId)).toBeChecked();
  });

  it("選択状態のチェックボックスを選択したら、非選択状態になること", async () => {
    mockAxiosGet();

    render(<Main />);
    await waitFor(() => screen.getByText(prefectures[0].prefName));

    const checkBoxTestId = `TID-checkBox-${prefectures[0].prefCode}`;
    const graphTestId = `TID-graph-${prefectures[0].prefCode}`;
    expect(screen.getByTestId(checkBoxTestId)).not.toBeChecked();

    fireEvent.click(screen.getByTestId(checkBoxTestId));
    await waitFor(() => {
      expect(screen.getAllByTestId(graphTestId)).toBeTruthy();
    });
    expect(screen.getByTestId(checkBoxTestId)).toBeChecked();

    fireEvent.click(screen.getByTestId(checkBoxTestId));
    await waitFor(() => {
      expect(screen.getByTestId(checkBoxTestId)).not.toBeChecked();
    });
  });
});
