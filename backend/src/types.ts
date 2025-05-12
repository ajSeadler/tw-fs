export type Result = {
  skater_name: string;
  placement: number;
  score: number | string;
  country: string;
};

export type Event = {
  name: string;
  location: string;
  date: string;
  host: string;
  results: Result[];
};
