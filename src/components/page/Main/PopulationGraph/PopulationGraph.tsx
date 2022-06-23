import React from "react";
import { PrefecturePopulation } from "../../../../types";

type Props = {
  displayValue: PrefecturePopulation[];
};
function PopulationGraph(props: Props) {
  const { displayValue } = props;
  return (
    <div className="populationGraph">
      {displayValue.map((prefecturePopulation: PrefecturePopulation) =>
        prefecturePopulation.populations.map((yearPopulation) => (
          <span
            key={yearPopulation.value}
            data-testid={`TID-graph-${prefecturePopulation.prefCode}`}
          >
            {yearPopulation.value}{" "}
          </span>
        ))
      )}
    </div>
  );
}

export default PopulationGraph;
