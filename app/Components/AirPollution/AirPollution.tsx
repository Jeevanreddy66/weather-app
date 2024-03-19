"use client";

import { FC } from "react";

// Normal Imports
import { useGlobalContext } from "../../context/globalContext";
import { airQualityIndexText } from "@/app/utils/misc";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

// Lucide React Icon Imports
import { thermo } from "@/app/utils/Icons";

const AirPollution: FC = () => {
  const { airQuality } = useGlobalContext();

  // Check if AirQuality is available &  also check if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  )
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find(
    (item) => item.rating <= airQualityIndex
  );

  return (
    <>
      <div className="air-pollution col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <h2 className="flex items-center gap-2 font-medium">
          {thermo}Air Pollution
        </h2>

        <Progress value={airQualityIndex} max={100} className="progress" />

        <p className="text-sm">Air Quality is: {filteredIndex?.description}.</p>
      </div>
    </>
  );
};

export default AirPollution;
