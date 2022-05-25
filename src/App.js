import styles from "./App.module.scss";
import {  useState } from "react";
import { SiWindicss } from "react-icons/si";
import { CgDrop } from "react-icons/cg";

const api = {
  key: "4c3d95108e261ec6bb580f7a911f1b90",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? styles.appWarm
            : styles.app
          : styles.app
      }
    >
     
      <main>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className={styles.locationBox}>
              <div className={styles.location}>
                {weather.name}, {weather.sys.country}
              </div>
              <div className={styles.date}>{dateBuilder(new Date())}</div>
            </div>
            <div className={styles.weatherBox}>
              <div className={styles.temp}>
                {Math.round(weather.main.temp)}°c
              </div>
              <ul className={styles.weather}>
                <li className={styles.weatheritem}>
                  <SiWindicss /> Wind {weather.wind.speed} m/s{" "}
                </li>
                <li className={styles.weatheritem}>
                  <CgDrop /> Hum {weather.main.humidity} %
                </li>
                <li className={styles.weatheritem}>
                  {weather.weather[0].main}
                </li>               
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
