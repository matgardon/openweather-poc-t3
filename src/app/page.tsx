import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { SearchLocations } from "./_components/SearchLocations";

export default async function Home() {
  const session = await auth();

  //TODO : prefetch 5 closest locations here ? in SearchLocations component ?

  if (session?.user) {
    // favorites = await api.bookmarks.get({ userId: session.user.id });
  }

  return (
    <HydrateClient>
      <SearchLocations />
      {/* TODO: tiles of saved favs */}
    </HydrateClient>
  );
}
