import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const THprovinceApi = "http://178.128.125.38/apiTHprovince";
  const weatherApi = "http://178.128.125.38/apiWeather?city=";

  const [THprovince, setTHprovince] = useState();
  const [city, setcity] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchTHprovince = async () => {
      const res = await axios(THprovinceApi);
      setTHprovince(res.data.RECORDS);
    };
    fetchTHprovince();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios(weatherApi + city);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      alert("City not found.");
    }
  };

  let weather = "normal";
  if (data) {
    weather = data.main.temp - 273 < 20 ? "cold" : "hot";
  }

  return (
    <div className={`center ${weather}`}>
      <div className="container">
        <header className="header">
          <div className="search">
            <input
              type="text"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              placeholder="Enter City Name"
              id="search-txt"
            />
            <div className="search-btn" onClick={submitHandler}>
              <i className="fa fa-search" aria-hidden="true" />
            </div>
          </div>
          <div className="select">
            <form>
              <label htmlFor="provinces">Thailand City</label>
              <br />
              <select
                className="selectbar"
                name="provinces"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              >
                {THprovince?.map((item) => (
                  <option key={item.id} value={item.name_en}>
                    {item.name_en}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </header>
        <div className="city">
          <div id="city-name">{data ? data.name : ""}</div>
          <img
            src={
              data
                ? `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
                : ""
            }
            id="icon"
            alt=""
          />
        </div>

        <div className="temperature">
          <div id="temp">
            temp:
            {data ? (data.main.temp - 273).toFixed(2) + "°C" : ""}
          </div>
        </div>

        <div className="humidity">
          humidity:
          <div id="humidity-div">{data ? data.main.humidity + "%" : ""}</div>
        </div>

        <div className="visibility">
          <div id="visibility-div">
            visibility:
            {data
              ? "visibility " + parseInt(data.visibility / 1000) + " KM"
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
