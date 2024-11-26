// import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Forecast from "./Forecast";
import { type OneCallResponse } from "~/types/OpenWeatherMapOneCall";
import { SearchLocations } from "../_components/SearchLocations";
import { isNullish } from "../_helpers";

type Props = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Weather({ searchParams }: Props) {
  // TODO: handle type validation on searchParams
  const name = ((await searchParams).name ?? "") as string;
  const country = ((await searchParams).country ?? "") as string;
  const stringLat = (await searchParams).lat;
  const stringLon = (await searchParams).lon;

  const lat = stringLat ? Number(stringLat) : null;
  const lon = stringLon ? Number(stringLon) : null;

  let weatherResult: OneCallResponse | null = null;

  if (!isNullish(lat) && !isNullish(lon)) {
    try {
      //TODO : prefetch wether for given URL, in order to benefit from HydrateClient
      weatherResult = await api.weather.getWeather({ lat, lon });
    } catch (getWeatherError) {
      // TODO handle user feedback
      console.error(getWeatherError);
    }
  }

  return (
    <HydrateClient>
      <SearchLocations />
      {/* TOFIX redundant type check because TS doesn't infer far enough */}
      {!!weatherResult && !isNullish(lat) && !isNullish(lon) && (
        <Forecast
          currentLocation={{ name, country, lat, lon }}
          now={weatherResult.current}
          daily={weatherResult.daily}
          hourly={weatherResult.hourly}
        />
      )}
    </HydrateClient>
  );
}
