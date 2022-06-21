import React, { useState } from "react";
import { Population, Populations } from "../../../types";

import "./PopulationGraph.css";
import PrefectureList from "./PrefectureList/PrefectureList";

function PopulationGraph() {
  const [populations, setPopulations] = useState<Populations>([]);
  return (
    <div className="populationGraph">
      <PrefectureList setPopulations={setPopulations} />
      {populations.map((population: Population) => (
        <p key={population.value}>{population.value}</p>
      ))}
    </div>
  );
}

export default PopulationGraph;
