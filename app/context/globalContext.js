"use client";

import axios from "axios";
import { debounce } from "lodash";
import React, { useContext, createContext, useState, useEffect } from "react";

// Normal Imports
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecastData, setFiveDayForecastData] = useState({});
  const [uvIndexData, setUvIndexData] = useState({});

  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([51.5074, 0.1278]);

  const fetchForecastData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecastData(res.data);
    } catch (error) {
      console.log("Error Fetching Forecast Data: ", error.message);
    }
  };

  // Get Air Quality Data
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

      setAirQuality(res.data);
    } catch (error) {
      console.log("Error Fetching Air Quality Data: ", error.message);
    }
  };

  // Get Five Day Forecast Data
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveDayForecast?lat=${lat}&lon=${lon}`);

      setFiveDayForecastData(res.data);
    } catch (error) {
      console.log("Error Fetching five day forecast Data: ", error.message);
    }
  };

  // Get UV Index Data
  const fetchUvIndexData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

      setUvIndexData(res.data);
    } catch (error) {
      console.log("Error fetching UV Index Data ", error.message);
    }
  };

  // Geo Coded Data from Search
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`api/geoCoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error while fetching Geo Coded List ", error.message);
    }
  };

  // Handle Search Input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") setGeoCodedList(defaultStates);
  };

  // Debounce Function (Adding delay in search results)
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) debouncedFetch(inputValue);

    // Cleanout
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecastData(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndexData(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          forecastData,
          airQuality,
          fiveDayForecastData,
          uvIndexData,
          geoCodedList,
          inputValue,
          handleInput,
        }}
      >
        <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
          {children}
        </GlobalContextUpdate.Provider>
      </GlobalContext.Provider>
    </>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
