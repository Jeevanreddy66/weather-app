"use client";

import { FC } from "react";

// Normal Imports
import { useGlobalContext } from "../../context/globalContext";
import { unixToTime } from "@/app/utils/misc";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

// Lucide React Icon Imports
import { sunset } from "@/app/utils/Icons";

const Sunset: FC = () => {
  const { forecastData } = useGlobalContext();

  if (!forecastData || !forecastData?.sys || !forecastData?.sys?.sunset)
    return <Skeleton className="h-[12rem] w-full" />;

  const times = forecastData?.sys?.sunset;
  const timezone = forecastData?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunriseTime = unixToTime(forecastData?.sys?.sunrise, timezone);

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {sunset}Sunset
          </h2>
          <p className="pt-4 text-2xl">{sunsetTime}</p>
        </div>

        <p className="text-sm">Sunrise: {sunriseTime}</p>
      </div>
    </>
  );
};

export default Sunset;
