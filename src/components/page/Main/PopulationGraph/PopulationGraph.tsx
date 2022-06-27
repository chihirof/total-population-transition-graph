import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { PrefecturePopulation } from "../../../../types";

type Props = {
  displayValues: PrefecturePopulation[];
};
function PopulationGraph(props: Props) {
  const { displayValues } = props;
  const chartData = [
    { name: "Page A", uv: 100 },
    { name: "Page B", uv: 200 },
    { name: "Page C", uv: 123 },
  ];

  return (
    <div className="populationGraph">
      <LineChart width={400} height={400} data={chartData}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      {displayValues.map((prefecturePopulation: PrefecturePopulation) =>
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
