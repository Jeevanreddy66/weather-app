"use client";
import { lazy } from "react";
import defaultStates from "./utils/defaultStates";

// Importing as Dynamic Components
const Navbar = lazy(() => import("./Components/Navbar"));
const Temperature = lazy(() => import("./Components/Temperature/Temperature"));
const FiveDayForecast = lazy(
  () => import("./Components/FiveDayForecast/FiveDayForecast")
);
const AirPollution = lazy(
  () => import("./Components/AirPollution/AirPollution")
);
const Sunset = lazy(() => import("./Components/Sunset/Sunset"));
const Wind = lazy(() => import("./Components/Wind/Wind"));
const DailyForecast = lazy(
  () => import("./Components/DailyForecast/DailyForecast")
);
const UvIndex = lazy(() => import("./Components/UvIndex/UvIndex"));
const Population = lazy(() => import("./Components/Population/Population"));
const FeelsLike = lazy(() => import("./Components/FeelsLike/FeelsLike"));
const Humidity = lazy(() => import("./Components/Humidity/Humidity"));
const Visibility = lazy(() => import("./Components/Visibility/Visibility"));
const Pressure = lazy(() => import("./Components/Pressure/Pressure"));

const Mapbox = lazy(() => import("./Components/Mapbox/Mapbox"));

export default function Home() {
  return (
    <>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
        <Navbar />

        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />

            <FiveDayForecast />
          </div>

          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />

              <Sunset />

              <Wind />

              <DailyForecast />

              <UvIndex />

              <Population />

              <FeelsLike />

              <Humidity />

              <Visibility />

              <Pressure />
            </div>

            <div className="mapbox-con mt-4 flex gap-4">
              <Mapbox />

              <div className="states flex flex-col gap-3 flex-1">
                <h2 className="flex items-center gap-2 font-medium">
                  Top Large Cities
                </h2>

                <div className="flex flex-col gap-4">
                  {defaultStates.map((state, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      >
                        <p className="px-6 py-4">{state.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-4 flex justify-center pb-8">
          <p className="footer-text text-sm flex items-center gap-1">
            Made by &copy; <b>Jeevan Reddy</b>
          </p>
        </footer>
      </main>
    </>
  );
}
