import React from "react";
import "./App.css";
import { usePrefectures } from "../../../hooks/usePrefectures";

function App() {
  const prefectures = usePrefectures();

  return (
    <div className="App">
      {prefectures.map(({ prefCode, prefName }) => (
        <p key={prefCode}>{prefName}</p>
      ))}
    </div>
  );
}

export default App;
