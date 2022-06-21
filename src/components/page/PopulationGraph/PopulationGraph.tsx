import React, { useState } from "react";
import { PrefecturePopulation } from "../../../types";

import "./PopulationGraph.css";
import PrefectureList from "./PrefectureList/PrefectureList";

function PopulationGraph() {
  const [displayValue, setDisplayValue] = useState<PrefecturePopulation[]>([]);
  return (
    <div className="populationGraph">
      <PrefectureList
        displayValue={displayValue}
        setDisplayValue={setDisplayValue}
      />
      {displayValue.map((prefecturePopulation: PrefecturePopulation) =>
        prefecturePopulation.populations.map((yearPopulation) => (
          <span key={yearPopulation.value}>{yearPopulation.value} </span>
        ))
      )}
    </div>
  );
}

export default PopulationGraph;
