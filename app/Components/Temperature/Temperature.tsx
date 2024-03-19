"use client";

import { FC, useEffect, useState } from "react";
import moment from "moment";

// Normal Imports
import { useGlobalContext } from "../../context/globalContext";
import { kelvinToCelcius } from "../../utils/misc";

// Lucide React Icon Imports
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";

const Temperature: FC = () => {
  const { forecastData } = useGlobalContext();

  const { main, timezone, name, weather } = forecastData;

  if (!forecastData || !weather) return <div>Loading...</div>;

  const temp = kelvinToCelcius(main?.temp);
  const minTemp = kelvinToCelcius(main?.temp_min);
  const maxTemp = kelvinToCelcius(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live Time Update
  useEffect(() => {
    // Update Time Every Second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);

      // Custom Format : 24 hour Format
      const formatedTime = localMoment.format("HH:mm:ss");

      // Day of the Week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <>
      <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
        <p className="flex items-center justify-between">
          <span className="font-medium">{currentDay}</span>
          <span className="font-medium">{localTime}</span>
        </p>

        <p className="pt-2 font-bold flex items-center gap-1">
          <span>{name}</span>
          <span>{navigation}</span>
        </p>

        <p className="py-10 text-9xl font-bold self-center">
          {temp}
          <sup>o</sup>
        </p>

        <div>
          <div>
            <span>{getIcon()}</span>
            <p className="pt-2 capitalize text-lg font-medium">{description}</p>
          </div>

          <p className="flex items-center gap-2">
            <span>
              Low:&nbsp;
              <b>
                {minTemp}
                <sup>o</sup>
              </b>
            </span>
            <span>
              High:&nbsp;
              <b>
                {maxTemp}
                <sup>o</sup>
              </b>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Temperature;
