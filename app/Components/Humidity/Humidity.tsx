"use client";

import { FC } from "react";

// Lucide React Icon Imports
import { droplets } from "@/app/utils/Icons";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

const Humidity: FC = () => {
  const { forecastData } = useGlobalContext();

  if (!forecastData || !forecastData?.main || !forecastData?.main?.humidity)
    return <Skeleton className="h-[12rem] w-full" />;

  const { humidity } = forecastData?.main;

  const getHumidityDesc = (humidity: number) => {
    if (humidity < 30) return `Dry: May cause skin irritation`;

    if (humidity >= 30 && humidity < 50)
      return `Comfortable: Ideal for health and comfort`;

    if (humidity >= 50 && humidity < 70)
      return `Moderate: Sticky, may increase allergens`;

    if (humidity >= 70) return `High: Uncomfortable, mild growth risk`;

    return `Unavailable: Humidity data not available`;
  };

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {droplets}Humidity
          </h2>

          <p className="pt-4 text-2xl">{humidity}%</p>
        </div>

        <p className="text-sm">{getHumidityDesc(humidity)}.</p>
      </div>
    </>
  );
};

export default Humidity;
