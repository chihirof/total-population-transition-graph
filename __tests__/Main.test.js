import React from "react";
import axios from "axios";
import { render, waitFor, screen } from "@testing-library/react";

import Main from "../src/components/page/Main/Main";

jest.mock("axios");
jest.mock("../src/api/apiKey");

const spyLogError = jest.spyOn(console, "error");

describe("Main", () => {
  afterEach(() => {
    axios.get.mockReset();
    spyLogError.mockClear();
  });

  it("画面表示時に都道府県データが表示されている", async () => {
    const prefectures = [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
      { prefCode: 3, prefName: "岩手県" },
    ];
    axios.get.mockResolvedValue({
      data: {
        statusCode: 200,
        result: prefectures,
      },
    });

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
});
