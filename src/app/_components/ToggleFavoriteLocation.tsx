"use client";

import { api } from "~/trpc/react";
import StarIcon from "./StarIcon";
import { type GeoCodingAPIResponse } from "~/types/OpenWeatherMapGeocoding";

export default function ToggleFavoriteLocation({
  location,
}: {
  location: Partial<GeoCodingAPIResponse>;
}) {
  const [favoriteLocations] = api.favoriteLocation.getAll.useSuspenseQuery();

  const favoriteLocation = favoriteLocations.find(
    (favoriteLocation) =>
      favoriteLocation.lat === location.lat?.toString() &&
      favoriteLocation.lon === location.lon?.toString(),
  );

  const utils = api.useUtils();

  const addToFavoriteLocations = api.favoriteLocation.add.useMutation({
    onSuccess: async () => {
      // invalidate cache on favorite locations
      await utils.favoriteLocation.invalidate();
    },
  });

  const removeFromFavoriteLocations = api.favoriteLocation.delete.useMutation({
    onSuccess: async () => {
      // invalidate cache on favorite locations
      await utils.favoriteLocation.invalidate();
    },
  });

  return (
    <StarIcon
      height={"1.5em"}
      className="ml-2 inline cursor-pointer"
      fill={!!favoriteLocation ? "#FFFFFF" : "none"}
      onClick={() =>
        !!favoriteLocation
          ? removeFromFavoriteLocations.mutate({ id: favoriteLocation.id })
          : addToFavoriteLocations.mutate({
              name: location.name ?? "",
              country: location.country ?? "",
              lat: location.lat?.toString() ?? "",
              lon: location.lon?.toString() ?? "",
            })
      }
    ></StarIcon>
  );
}
