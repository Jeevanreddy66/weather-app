"use client";

import { FC } from "react";

// Normal Imports
import { useGlobalContext } from "../../context/globalContext";
import UvProgressBar from "../UvProgress/UvProgressBar";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";

// Lucide React Icon Imports
import { sun } from "@/app/utils/Icons";

const UvIndex: FC = () => {
  const { uvIndexData } = useGlobalContext();

  if (!uvIndexData || !uvIndexData.daily)
    return <Skeleton className="h-[12rem] w-full" />;

  const { daily } = uvIndexData;

  const { uv_index_clear_sky_max, uv_index_max } = uvIndexData?.daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2)
      return {
        text: "Low",
        description: "No Protection Required",
      };
    else if (uvIndex <= 5)
      return {
        text: "Moderate",
        description: "Stay in shade near Mid-day",
      };
    else if (uvIndex <= 7)
      return {
        text: "High",
        description: "Wear a Hat and Sunglasses",
      };
    else
      return {
        text: "Very High",
        description: "Apply Sunscreen SPF 30+ every 2 hours.",
      };
  };

  const marginLeftPercentage = (uvIndexMax / 14) * 100;

  return (
    <>
      <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="top">
          <h1 className="flex items-center gap-2 font-medium">{sun}UV Index</h1>

          <p className="pt-4 text-2xl mb-1">
            {uvIndexMax}&nbsp;
            <span className="text-sm">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgressBar
            value={marginLeftPercentage}
            max={14}
            className="progress"
          />
        </div>
        <p className="text-sm">{uvIndexCategory(uvIndexMax).description}</p>
      </div>
    </>
  );
};

export default UvIndex;
