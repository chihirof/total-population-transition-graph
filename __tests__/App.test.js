import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("Helllo World!", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Hello World!"));

    expect(screen.getByText("Hello World!")).toBeTruthy();
  });
});
