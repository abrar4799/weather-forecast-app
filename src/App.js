import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import Header from "./Components/Header";
import DatailsCard from "./Components/DetailsCard";
import SummaryCard from "./Components/SummaryCard";
import { BiCurrentLocation } from "react-icons/bi";
import DetailsCardfahrenheit from "./Components/DetailsCardfahrenheit";
import SummaryCardFahrenheit from "./Components/SummaryCardFahrenheit";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY);
  const [noData, setNoData] = useState('Hello there, Kindly you can select your location and  desirable unit temperature to get weather. Pay attention that cairo city was selected by default. ');
  const [weatherData, setWeatherData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON_URL}.png}` /**10n@2x */
  );
  const [data, setData] = useState([]); // For City
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectState] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("Cairo"); //Cairo
  const [date, setDate] = useState("10-05-2022");
  /////////////////////////////// GET CITY FROM API ///////////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();
  console.log(country);

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    console.log(states, "states");
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    console.log(cities, "citiy");
    setCities(cities);
  };
  const handleCity = (e) => {
    let x = document.getElementById("selectedCity");
    let xcity = x.value;
    setCity(xcity);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// GET WEATHER FROM API ////////////////////////////////////////////////////////////////////

  function handleSubmit(e) {
    e.preventDefault();
    getWeather(city);
  }

  const getWeather = async (location) => {
    setWeatherData([]);
    let how_to_search =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon${location[1]}`;
    try {
      let res = await fetch(
        `${
          process.env.REACT_APP_URL + how_to_search
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      console.log(
        `${
          process.env.REACT_APP_URL + how_to_search
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      ); /**cnt=5&exclude=hourly,minutely */
      let data = await res.json();
      if (data.cod != 200) {
        setNoData("Location Not Found");
        return;
      }
      console.log(data, "data weather");
      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]
        }.png`
      );
      console.log(weatherIcon, "ICONS");
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////TRY TO GET CURRENT POSITION //////////////////////////////////////////////////
  /*const myIP = (location) => {
    let crd = location.coords;

    //const {latitude, longitude} = location.coords
    let lat = crd.latitude.toString();
    let lng = crd.longitude.toString();

    // console.log(latitude , longitude , 'lat')
    let coordinates = [lat, lng];
    console.log(coordinates, "coordinates");
    getWeather(coordinates);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(myIP);
  }, []);
*/
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  return (
    <div className="bg-gray-1000 flex items-center justify-center w-screen h-screen py-10">
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        {/*  Form Section    */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3
              className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
            rounded-md bg-white bg-opacity-30"
            >
              forecast
            </h3>

            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <IoLocationOutline />
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <br />
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-white text-2xl">
              The Only Weather Forecast You Need
            </h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
          </div>
          <form className="flex" onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <label className="form-label">Country :</label>
              <select
                name="country"
                className="form-select form-select-sm mb-3"
                onChange={(e) => handleCountry(e)}
              >
                <option>--Select Country--</option>
                {country.map((items) => (
                  <option key={items} value={getCountry}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="mb-3 ">
              <label className="form-label">State :</label>
              <select
                name="country"
                className="form-select form-select-sm mb-3"
                onChange={(e) => handleState(e)}
              >
                <option>--Select State--</option>
                {getState.map((items) => (
                  <option key={items} value={selectedState}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="mb-3 ">
              <label className="form-label">City :</label>
              <select
                name="country"
                className="form-select form-select-sm mb-3"
                onChange={(e) => handleCity(e)}
                id="selectedCity"
              >
                <option>--Select City--</option>
                {cities.map((items) => (
                  <option key={items.name}>{items.name}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="mb-3">
              <button type="submit" class="btn btn-dark">
                Get
              </button>
              <br />
              {/* <span onClick={() =>{
                   navigator.geolocation.getCurrentPosition(myIP)
                 } }> 
                <BiCurrentLocation /> 
                </span> */}
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="celsiusToFahrenheit"
                  id="celsius"
                  value='c'
                  
                />
                <label className="btn btn-outline-dark" for="celsius">
                  C
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="celsiusToFahrenheit"
                  id="fahrenheit"
                 value='f'
                />
                <label class="btn btn-outline-dark" for="fahrenheit">
                  F
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="w-2/4 p-5">
          {/* Info Card Section  */}
          <Header />
          <div className="flex flex-col my-10">
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-400 text-6xl  ">
                  {noData}
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4">Weather</h1>
                {  document.querySelector('input[name=celsiusToFahrenheit]:checked').value === 'c'  ?  <DatailsCard  weather_icon={weatherIcon} weather_data={weatherData}  /> 
                 :  <DetailsCardfahrenheit
                 weather_icon={weatherIcon}
                 weather_data={weatherData}
               />} 
                { /*<DatailsCard  weather_icon={weatherIcon} weather_data={weatherData}  /> */}
              { /* <DetailsCardfahrenheit
                  weather_icon={weatherIcon}
                  weather_data={weatherData}
            /> */}
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">
                  More On {city}
                </h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map((days, index) => {
                   
                   if (index > 0) {

                      return <>
                      { document.querySelector('input[name=celsiusToFahrenheit]:checked').value === 'c'  ?
                      <SummaryCard key={index} day={days} /> : <SummaryCardFahrenheit key={index} day={days} />
                   }
                       </>
                    }
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
