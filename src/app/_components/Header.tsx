import Link from "next/link";
import { HeaderNavLink } from "./HeaderNavLink";
import { auth } from "~/server/auth";

const menuItems = [
  { label: `Home`, url: `/` },
  { label: `Weather`, url: `/weather` },
  { label: `About`, url: `/about` },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="flex flex-col gap-5">
      <div className="flex items-center py-4">
        <Link href="/" className="ml-4">
          {/* TODO display inline */}
          {/* <Image
            width={36}
            height={36}
            src="/favicon.ico"
            className="w-8 md:w-9"
            alt="logo"
          /> */}
          <span className="text-xl font-bold tracking-tight">
            OpenWeather <span className="text-[hsl(280,100%,70%)]">T3</span> POC
          </span>
        </Link>
        <nav className="ml-8">
          <ul className="flex flex-wrap gap-x-8 text-gray-900">
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-10 mr-4 flex flex-row items-center gap-2">
          <p className="text-center text-base text-white">
            {session && <span>signed in: {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-lg bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
}
