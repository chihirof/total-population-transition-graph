import { useState, useEffect } from "react";

import { getPrefectures } from "../api/getPrefectures";
import { Prefectures } from "../types";

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefectures>([]);
  useEffect(() => {
    (async () => {
      try {
        setPrefectures(await getPrefectures());
      } catch (err: any) {
        // TODO エラー処理
        // トーストを表示したいが、ここからどうやってUIまで伝えるかを検討したい
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    })();
  }, []);

  return prefectures;
};
