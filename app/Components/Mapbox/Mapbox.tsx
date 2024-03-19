"use client";

import { FC, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Normal Imports
import { useGlobalContext } from "@/app/context/globalContext";

// @ts-ignore
function FlyToActiveCity({ activeCityCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCoords.lat, activeCityCoords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCoords, map]);

  return null;
}

const Mapbox: FC = () => {
  const { forecastData } = useGlobalContext();

  const activeCityCoords: { lat: number; lon: number } = forecastData?.coord;

  if (!forecastData || !forecastData?.coord || !activeCityCoords)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <>
      <div className="flex-1 basis-[50%] border rounded-lg">
        <MapContainer
          center={[activeCityCoords.lat, activeCityCoords.lon]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
          className="rounded-lg m-4"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributions'
          />

          <FlyToActiveCity activeCityCoords={activeCityCoords} />
        </MapContainer>
      </div>
    </>
  );
};

export default Mapbox;
