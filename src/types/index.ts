export type Prefecture = {
  prefCode: number;
  prefName: string;
};
export type Prefectures = Prefecture[];

export type Population = {
  year: number;
  value: number;
};
export type PrefecturePopulation = {
  prefCode: number;
  populations: Population[];
};
