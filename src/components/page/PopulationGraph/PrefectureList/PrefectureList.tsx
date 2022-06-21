import React from "react";

import "./PrefectureList.css";
import { usePrefectures } from "../../../../hooks/usePrefectures";
import PrefectureCheckBox from "../PrefectureCheckBox/PrefectureCheckBox";
import { Populations, Prefecture } from "../../../../types";
import { getPopulation } from "../../../../api/getPopulation";

type Props = {
  setPopulations: (populations: Populations) => void;
};

function PrefectureList(props: Props) {
  const { setPopulations } = props;
  const prefectures = usePrefectures();
  const onChange = async (selected: boolean, prefecture: Prefecture) => {
    // eslint-disable-next-line no-console
    console.log("selected: ", selected, " / ", "prefecture: ", prefecture);
    if (selected) {
      const result = await getPopulation(prefecture.prefCode);
      // TODO もともと洗濯しているものが差し代わってしまう。追加する形にしたい。
      setPopulations(result);
    }
  };

  return (
    <div className="prefectureList">
      <h3>都道府県</h3>
      <div className="prefectureItems">
        {prefectures.map(({ prefCode, prefName }) => (
          <PrefectureCheckBox
            key={prefCode}
            prefecture={{ prefCode, prefName }}
            onCheck={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default PrefectureList;
