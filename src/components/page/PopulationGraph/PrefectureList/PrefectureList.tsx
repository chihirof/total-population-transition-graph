import React from "react";

import "./PrefectureList.css";
import { usePrefectures } from "../../../../hooks/usePrefectures";
import PrefectureCheckBox from "../PrefectureCheckBox/PrefectureCheckBox";
import { Prefecture } from "../../../../types";

function PrefectureList() {
  const prefectures = usePrefectures();
  const onChange = (selected: boolean, prefecture: Prefecture) => {
    // eslint-disable-next-line no-console
    console.log("selected: ", selected, " / ", "prefecture: ", prefecture);
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
