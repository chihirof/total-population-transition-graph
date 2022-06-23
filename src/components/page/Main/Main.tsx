import React, { useState } from "react";
import { PrefecturePopulation } from "../../../types";

import "./Main.css";
import PopulationGraph from "./PopulationGraph/PopulationGraph";
import PrefectureList from "./PrefectureList/PrefectureList";

function Main() {
  const [displayValue, setDisplayValue] = useState<PrefecturePopulation[]>([]);
  return (
    <div className="main">
      <PrefectureList
        displayValue={displayValue}
        setDisplayValue={setDisplayValue}
      />
      <PopulationGraph displayValue={displayValue} />
    </div>
  );
}

export default Main;
