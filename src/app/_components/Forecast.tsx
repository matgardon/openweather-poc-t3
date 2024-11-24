import { Degree } from "./Degree";
import { Sunrise } from "./Icons/Sunrise";
import { Sunset } from "./Icons/Sunset";
import { Tile } from "./Tile";

import {
  getHumidityValue,
  getWindDirection,
  // getVisibilityValue,
  getSunTime,
  getPop,
  isNullish,
} from "./../_helpers";

import {
  type CurrentWeather,
  type Daily,
  type Hourly,
} from "~/types/OpenWeatherMapOneCall";
import { type GeoCodingAPIResponse } from "~/types/OpenWeatherMapGeocoding";

type Props = {
  currentLocation: Partial<GeoCodingAPIResponse>;
  now: CurrentWeather;
  hourly: Hourly[];
  daily: Daily[];
};

export function Forecast({ currentLocation, now, daily, hourly }: Props) {
  const today = daily[0];

  /* TODO: handle fallbacks when now not available */
  return (
    <div className="backdrop-blur-ls h-full w-full rounded bg-white bg-opacity-20 py-4 drop-shadow-lg md:px-10 md:py-4 lg:h-auto lg:px-24">
      <div className="mx-auto w-[300px]">
        {/* CURRENT LOCATION AND SUMMARY */}
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {currentLocation.name}{" "}
            <span className="font-thin">{currentLocation.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(now.temp)} />
          </h1>
          <p className="text-sm">
            {now.weather[0]?.main} ({now.weather[0]?.description})
          </p>
          {!isNullish(today?.temp?.max) && !isNullish(today?.temp?.min) && (
            <p className="text-sm">
              H: <Degree temp={Math.ceil(today?.temp?.max)} /> L:{" "}
              <Degree temp={Math.floor(today?.temp?.min)} />
            </p>
          )}
        </section>

        {/* HOURLY FORECAST */}
        <section className="mb-5 mt-4 flex overflow-x-scroll pb-2">
          {hourly.map((hourlyForecast, i) => (
            <div
              key={i}
              className="inline-block w-[50px] flex-shrink-0 text-center"
            >
              <p className="text-sm">
                {i === 0
                  ? "Now"
                  : new Date(hourlyForecast.dt * 1000).getHours()}
              </p>
              {/* TODO use Next Image component, configure external loader */}
              <img
                alt={`weather-icon-${hourlyForecast?.weather[0]?.description}`}
                src={`http://openweathermap.org/img/wn/${hourlyForecast?.weather[0]?.icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(hourlyForecast?.temp)} />
              </p>
            </div>
          ))}
        </section>

        {/* DAILY SUMMARY */}
        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="backdrop-blur-ls mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg">
            <Sunrise />{" "}
            <span className="mt-2">{getSunTime(today?.sunrise)}</span>
          </div>
          <div className="backdrop-blur-ls mb-5 flex w-[140px] flex-col items-center rounded bg-white/20 py-4 text-xs font-bold drop-shadow-lg">
            <Sunset /> <span className="mt-2">{getSunTime(today?.sunset)}</span>
          </div>

          {!isNullish(today?.wind_speed) && (
            <Tile
              icon="wind"
              title="Wind"
              info={`${Math.round(today.wind_speed)} km/h`}
              description={`${getWindDirection(
                Math.round(today?.wind_deg ?? 0),
              )}, gusts 
            ${today?.wind_gust?.toFixed(1)} km/h`}
            />
          )}
          {/* TODO handle new onecall props: feels_like morning, eve, night */}
          {!isNullish(today?.feels_like) && (
            <Tile
              icon="feels"
              title="Feels like"
              info={<Degree temp={Math.round(today.feels_like.day)} />}
              description={`Feels ${
                Math.round(today.feels_like.day) <
                Math.round(today.temp?.day ?? 0)
                  ? "colder"
                  : "warmer"
              }`}
            />
          )}
          {!isNullish(today?.humidity) && (
            <Tile
              icon="humidity"
              title="Humidity"
              info={`${today.humidity} %`}
              description={getHumidityValue(today.humidity)}
            />
          )}
          {!isNullish(today?.pop) && (
            <Tile
              icon="pop"
              title="Precipitation"
              info={`${Math.round(today.pop * 100)}%`}
              description={`${getPop(today.pop)}, clouds at ${today?.clouds}%`}
            />
          )}
          {!isNullish(today?.pressure) && (
            <Tile
              icon="pressure"
              title="Pressure"
              info={`${today.pressure} hPa`}
              description={` ${
                Math.round(today.pressure) < 1013 ? "Lower" : "Higher"
              } than standard`}
            />
          )}
          {/* {!isNullish(today?.visibility) && (
            <Tile
              icon="visibility"
              title="Visibility"
              info={`${(today?.uvi / 1000).toFixed()} km`}
              description={getVisibilityValue(today.visibility)}
            />
          )} */}
        </section>
      </div>
    </div>
  );
}
