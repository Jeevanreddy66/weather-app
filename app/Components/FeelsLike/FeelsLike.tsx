"use client";

import { FC } from "react";

// Lucide React Icon Imports
import { thermometer } from "@/app/utils/Icons";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToCelcius } from "@/app/utils/misc";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

const FeelsLike: FC = () => {
  const { forecastData } = useGlobalContext();

  if (!forecastData || !forecastData?.main || !forecastData?.main?.feels_like)
    return <Skeleton className="h-[12rem] w-full" />;

  const { feels_like, temp_min, temp_max } = forecastData?.main;

  const feelsLikeText = (
    feels_like: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feels_like < avgTemp - 5)
      return `Feels significantly colder than actual temperature`;
    if (feels_like > avgTemp - 5 && feels_like <= avgTemp + 5)
      return `Feels colder than actual temperature.`;
    if (feels_like > avgTemp + 5)
      return `Feels significantly warmer than actual temperature.`;

    return `Temperature feeling is typical for this range`;
  };

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {thermometer}Feels Like
          </h2>

          <p className="pt-4 text-2xl">
            {kelvinToCelcius(feels_like)}
            <sup>o</sup>
          </p>
        </div>

        <p className="text-sm">
          {feelsLikeText(feels_like, temp_min, temp_max)}
        </p>
      </div>
    </>
  );
};

export default FeelsLike;
