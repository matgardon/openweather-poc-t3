import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { SearchLocations } from "./_components/SearchLocations";
import { type FavoriteLocation } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  //TODO : prefetch 5 closest locations here ? in SearchLocations component ?

  let favoriteLocations: FavoriteLocation[] | null = null;
  if (session?.user) {
    favoriteLocations = await api.favoriteLocation.getAll();
  }

  return (
    <HydrateClient>
      <SearchLocations />
      {/* if any favoriteLocations, display them as clickable tiles on home page */}
      {!!favoriteLocations?.length && (
        <>
          <h3 className="py-3 text-center text-2xl">Your favorite locations</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoriteLocations?.map((location, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/weather",
                  query: {
                    lat: location.lat,
                    lon: location.lon,
                    name: location.name,
                    country: location.country,
                  },
                }}
              >
                <div
                  key={location.id}
                  className="backdrop-blur-ls rounded bg-white bg-opacity-20 p-4 text-center shadow-md drop-shadow-lg transition duration-300 hover:shadow-lg"
                >
                  <h2 className="mb-2 text-lg font-bold">{location.name}</h2>
                  <p className="text-white-900">{location.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </HydrateClient>
  );
}
