import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { SearchLocations } from "./_components/searchLocations";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-row items-center justify-between gap-12 px-0 py-4">
          <div className="flex flex-col items-center gap-5 px-0">
            <span className="text-xl font-bold tracking-tight">
              OpenWeather <span className="text-[hsl(280,100%,70%)]">T3</span>{" "}
              POC
            </span>
          </div>
          <div className="flex flex-row items-center gap-2 px-0">
            {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

            <p className="text-center text-base text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && <SearchLocations />}
        </div>
      </main>
    </HydrateClient>
  );
}
