import React from "react";
import ReactDOM from "react-dom/client";
import PopulationGraph from "./components/page/PopulationGraph/PopulationGraph";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopulationGraph />
  </React.StrictMode>
);
