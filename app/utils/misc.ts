import moment from "moment";

export const kelvinToCelcius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const airQualityIndexText = [
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("dddd");
};

export const formatPopulation = (population: number) => {
  if (population >= 1000000) return (population / 1000000).toFixed(1) + "M";
  else if (population >= 1000) return (population / 1000).toFixed(1) + "K";
  else return population;
};
