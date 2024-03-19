"use client";

import { FC } from "react";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";

// Lucide React Icon Imports
import { calender } from "@/app/utils/Icons";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";
import { kelvinToCelcius, unixToDay, unixToTime } from "@/app/utils/misc";

const FiveDayForecast: FC = () => {
  const { fiveDayForecastData } = useGlobalContext();

  const { city, list } = fiveDayForecastData;

  if (!fiveDayForecastData || !city || !list)
    return <Skeleton className="h-[12rem] w-full" />;

  const processData = (
    dailyData: {
      main: {
        temp_min: number;
        temp_max: number;
      };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach((day) => {
      if (day.main.temp_min < minTemp) minTemp = day.main.temp_min;

      if (day.main.temp_max > maxTemp) maxTemp = day.main.temp_max;
    });

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelcius(minTemp),
      maxTemp: kelvinToCelcius(maxTemp),
    };
  };

  const dailyForecast = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);

    dailyForecast.push(processData(dailyData));
  }

  return (
    <>
      <div className="pt-6 px-4 flex-1 border rounded-lg flex flex-col pb-5 justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {calender} 5-Day Forecast for {city.name}
          </h2>

          <div className="forecast-list pt-3">
            {dailyForecast.map((day, i) => (
              <div
                key={i}
                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2"
              >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-between">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4 ">
                  <p className="font-bold">
                    {day.minTemp.toFixed(0)}
                    <sup>o</sup>C
                  </p>

                  <div className="temperature-progress flex-1 w-full h-2 rounded-lg"></div>

                  <p className="font-bold">
                    {day.maxTemp.toFixed(0)}
                    <sup>o</sup>C
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FiveDayForecast;
