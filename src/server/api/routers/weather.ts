import { TRPCError } from "@trpc/server";
import { z } from "zod";

// TODO handle path aliases
import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type OneCallResponse } from "~/types/OpenWeatherMapOneCall";

//TODO handle null/not found before querying + streamined way to access it using env.js
const openWeatherMapApiKey = process.env.OPENWEATHER_APIKEY;

export const weatherRouter = createTRPCRouter({
  //TODO: protected ?
  getWeather: publicProcedure
    .input(
      z.object({
        // GPS coordinates validation
        lat: z.number().min(-90).max(90),
        lon: z.number().min(-180).max(180),
      }),
    )
    .query(async ({ input }) => {
      try {
        // old API: search by city
        // const response = await fetch(
        //   `https://api.openweathermap.org/data/2.5/weather?q=${input.city}&appid=YOUR_OPENWEATHER_API_KEY`,
        // );

        // TODO improve exclude rules // make it an input optional param
        // TODO: type one call options (units, lang, tz etc)
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${input.lat}&lon=${input.lon}&exclude=minutely,alerts&units=metric&appid=${openWeatherMapApiKey}`,
        );
        if (!response.ok) {
          // TODO improve response error logging => check errorCode, errorMessage etc from openweather
          console.error(response.body);
          throw new Error(
            `Unexpected response status: '${response.status}:${response.statusText}'`,
          );
        }

        const data = (await response.json()) as OneCallResponse;

        return data;
      } catch (error) {
        //TODO : winston logger for cleaner error handling
        console.error("Error fetching weather data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch weather data",
        });
      }
    }),
});
