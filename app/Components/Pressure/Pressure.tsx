"use client";

import { FC } from "react";

// Lucide React Icon Imports
import { gauge } from "@/app/utils/Icons";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

const Pressure: FC = () => {
  const { forecastData } = useGlobalContext();

  if (!forecastData || !forecastData?.main?.pressure)
    return <Skeleton className="h-[12rem] w-full" />;

  const { pressure } = forecastData?.main;

  const getPressureDesc = (pressure: number) => {
    if (pressure < 1000) return `Very Low Pressure`;

    if (pressure >= 1000 && pressure < 1015)
      return `Low Pressure. Expect Weather Changes.`;

    if (pressure >= 1015 && pressure < 1025)
      return `Normal Pressure. Expect Weather Changes.`;

    if (pressure >= 1025 && pressure < 1040)
      return `High Pressure. Expect Weather Changes.`;

    if (pressure >= 1040) return `Very High Pressure. Expect Weather Changes.`;

    return `Unavailable: Pressure data not available`;
  };

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {gauge}Pressure
          </h2>

          <p className="pt-4 text-2xl">{pressure} hPa</p>
        </div>

        <p className="text-sm">{getPressureDesc(pressure)}.</p>
      </div>
    </>
  );
};

export default Pressure;
