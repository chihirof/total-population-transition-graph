import React from "react";
import axios from "axios";
import { render, waitFor, screen } from "@testing-library/react";

import PopulationGraph from "../src/components/page/PopulationGraph/PopulationGraph";

jest.mock("axios");
jest.mock("../src/api/apiKey");

describe("PopulationGraph", () => {
  it("画面表示時に都道府県データが表示されている", async () => {
    axios.get.mockResolvedValue({
      data: {
        statusCode: 200,
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
          { prefCode: 3, prefName: "岩手県" },
        ],
      },
    });
    render(<PopulationGraph />);
    await waitFor(() => screen.getByText("北海道"));

    expect(screen.getByText("北海道")).toBeTruthy();
    expect(screen.getByText("青森県")).toBeTruthy();
    expect(screen.getByText("岩手県")).toBeTruthy();
  });
});
