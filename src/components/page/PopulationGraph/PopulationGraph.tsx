import React from "react";
import "./PopulationGraph.css";
import { usePrefectures } from "../../../hooks/usePrefectures";

function PopulationGraph() {
  const prefectures = usePrefectures();

  return (
    <div className="PopulationGraph">
      {prefectures.map(({ prefCode, prefName }) => (
        <p key={prefCode}>{prefName}</p>
      ))}
    </div>
  );
}

export default PopulationGraph;
