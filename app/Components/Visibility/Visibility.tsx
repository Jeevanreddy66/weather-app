"use client";

import { FC } from "react";

// Lucide React Icon Imports
import { eye } from "@/app/utils/Icons";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

const Visibility: FC = () => {
  const { forecastData } = useGlobalContext();

  if (!forecastData) return <Skeleton className="h-[12rem] w-full" />;

  const { visibility } = forecastData;

  const getVisibilityDesc = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return `Excellent: Clear and Vast View`;
    if (visibilityInKm > 5) return `Good: Easily navigable`;
    if (visibilityInKm > 2) return `Moderate: Some Limitations`;
    if (visibilityInKm <= 2) return `Poor: Restricted and Unclear`;

    return `Unavailable: Visibility data not available`;
  };

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h2 className="flex items-center gap-2 font-medium">
            {eye}Visibility
          </h2>

          <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} Km</p>
        </div>

        <p className="text-sm">{getVisibilityDesc(visibility)}.</p>
      </div>
    </>
  );
};

export default Visibility;
