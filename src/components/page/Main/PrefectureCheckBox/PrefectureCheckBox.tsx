import React from "react";
import { Prefecture } from "../../../../types";
import "./PrefectureCheckBox.css";

type Props = {
  prefecture: Prefecture;
  onCheck: (selected: boolean, prefecture: Prefecture) => void;
};

function PrefectureCheckBox(props: Props) {
  const { prefecture, onCheck } = props;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(event.target.checked, prefecture);
  };
  const inputId = `checkBox-${prefecture.prefCode}`;
  return (
    <div className="prefectureCheckBox">
      <label htmlFor={inputId}>{prefecture.prefName}</label>
      <input
        type="checkbox"
        id={inputId}
        onChange={onChange}
        data-testid={`TID-${inputId}`}
      />
    </div>
  );
}

export default PrefectureCheckBox;
