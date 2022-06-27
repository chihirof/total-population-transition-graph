import React, { useState } from "react";
import { PrefecturePopulation } from "../../../types";

import "./Main.css";
import PopulationGraph from "./PopulationGraph/PopulationGraph";
import PrefectureList from "./PrefectureList/PrefectureList";

function Main() {
  const [displayValues, setDisplayValues] = useState<PrefecturePopulation[]>(
    []
  );
  return (
    <div className="main">
      <PrefectureList
        displayValues={displayValues}
        setDisplayValues={setDisplayValues}
      />
      <PopulationGraph displayValues={displayValues} />
    </div>
  );
}

export default Main;
