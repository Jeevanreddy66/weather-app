"use client";

import { FC } from "react";

// Normal Imports
import { useGlobalContext } from "../../context/globalContext";

// Shadcn Component Imports
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Lucide React Icon Imports
import { drizzleIcon, clearSky, cloudy, snow, rain } from "@/app/utils/Icons";
import moment from "moment";
import { kelvinToCelcius } from "@/app/utils/misc";

const DailyForecast: FC = () => {
  const { forecastData, fiveDayForecastData } = useGlobalContext();

  const { weather } = forecastData;
  const { city, list } = fiveDayForecastData;

  if (!forecastData || !weather)
    return <Skeleton className="h-[12rem] w-full" />;

  if (!fiveDayForecastData || !city || !list)
    return <Skeleton className="h-[12rem] w-full" />;

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const getIcon = () => {
    switch (weather[0]?.main) {
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

  // Filter the list for today's forecast
  const todayForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) =>
      forecast.dt_txt.startsWith(todayString)
  );

  return (
    <>
      <div className="air-pollution col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
        <div className="h-full flex gap-10 overflow-hidden">
          {todayForecast.length < 1 ? (
            <div className="flex justify-center items-center">
              <h1 className="text-[3rem] line-through text-rose-500">
                No Data Available
              </h1>
            </div>
          ) : (
            <div className="w-full">
              <Carousel>
                <CarouselContent>
                  {todayForecast.map((forecast: any) => (
                    <CarouselItem
                      key={forecast.dt_txt}
                      className="flex flex-col basis-[8rem] gap-4 cursor-grab"
                    >
                      <p className="text-gray-300">
                        {moment(forecast.dt_txt).format("HH:mm")}
                      </p>

                      <p>{getIcon()}</p>

                      <p className="mt-3">
                        {kelvinToCelcius(forecast.main.temp)}
                        <sup>o</sup>&nbsp;C
                      </p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
