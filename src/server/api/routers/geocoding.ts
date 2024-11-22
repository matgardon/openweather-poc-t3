import { TRPCError } from "@trpc/server";
import { z } from "zod";

// TODO handle path aliases
import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type GeoCodingAPIResponseList } from "~/server/types/OpenWeatherMapGeocoding";

//TODO handle null/not found before querying + streamined way to access it using env.js
const openWeatherMapApiKey = process.env.OPENWEATHER_APIKEY;
const DEFAULT_SEARCH_SIZE = 5;

export const geocodingRouter = createTRPCRouter({
  //TODO: protected ?
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        size: z.number().min(1).optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // TODO: type options: limit, others ?
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${input.query}&limit=${input.size ?? DEFAULT_SEARCH_SIZE}&appid=${openWeatherMapApiKey}`,
        );
        if (!response.ok) {
          // TODO improve response error logging => check errorCode, errorMessage etc from openweather
          console.error(response.body);
          throw new Error(
            `Unexpected response status: '${response.status}:${response.statusText}'`,
          );
        }

        const data = (await response.json()) as GeoCodingAPIResponseList;

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
