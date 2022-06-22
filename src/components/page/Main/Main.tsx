import React, { useState } from "react";
import { PrefecturePopulation } from "../../../types";

import "./Main.css";
import PrefectureList from "./PrefectureList/PrefectureList";

function Main() {
  const [displayValue, setDisplayValue] = useState<PrefecturePopulation[]>([]);
  return (
    <div className="main">
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

export default Main;
