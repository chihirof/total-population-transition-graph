import React from "react";

import "./PrefectureList.css";
import { usePrefectures } from "../../../../hooks/usePrefectures";
import PrefectureCheckBox from "../PrefectureCheckBox/PrefectureCheckBox";
import { Prefecture, PrefecturePopulation } from "../../../../types";
import { getPopulation } from "../../../../api/getPopulation";

type Props = {
  displayValues: PrefecturePopulation[];
  setDisplayValues: (populations: PrefecturePopulation[]) => void;
};

function PrefectureList(props: Props) {
  const { displayValues, setDisplayValues } = props;
  const prefectures = usePrefectures();
  const onChange = async (selected: boolean, prefecture: Prefecture) => {
    if (selected) {
      try {
        const prefecturePopulation = await getPopulation(prefecture.prefCode);
        setDisplayValues([...displayValues, prefecturePopulation]);
      } catch (err: any) {
        // TODO エラー処理
        // トーストを表示したい
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    } else {
      setDisplayValues(
        displayValues.filter((v) => v.prefCode !== prefecture.prefCode)
      );
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
