import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Forecast } from "./Forecast";
import { type OneCallResponse } from "~/types/OpenWeatherMapOneCall";

type Props = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Weather({ searchParams }: Props) {
  // TODO: handle type validation on searchParams
  const name = ((await searchParams).name ?? "") as string;
  const country = ((await searchParams).country ?? "") as string;
  const lat = Number((await searchParams).lat ?? 0);
  const lon = Number((await searchParams).lon ?? 0);

  const session = await auth();

  let weatherResult: OneCallResponse | null = null;
  if (session?.user) {
    try {
      //TODO : prefetch wether for given URL, in order to benefit from HydrateClient
      weatherResult = await api.weather.getWeather({ lat, lon });
    } catch (getWeatherError) {
      // TODO handle user feedback
      console.error(getWeatherError);
    }

    return (
      <HydrateClient>
        {!!weatherResult && (
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

  // TODO handle unauthenticated
}
