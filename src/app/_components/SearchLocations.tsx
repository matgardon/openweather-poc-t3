"use client";

import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "react-use";

import { api } from "~/trpc/react";

export function SearchLocations() {
  // const utils = api.useUtils();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // TODO: escape eslint when '_' special char used
  // TODO: use cancel to stop debounce when needed
  // debounce search field for 300ms
  const [, _cancel] = useDebounce(
    () => {
      setDebouncedValue(searchInput);
    },
    150,
    [searchInput],
  );

  const searchResults = api.geocoding.search.useQuery(
    {
      query: debouncedValue,
      size: 5,
    },
    {
      // only fetch when 2 or more characters
      enabled: debouncedValue.length >= 2,
    },
  );

  return (
    <div className="w-full max-w-5xl px-5">
      <input
        type="text"
        placeholder="Search location ..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-gray-500 focus:outline-none"
      />
      <div className="mx-auto max-w-[80%] py-4 text-center">
        {searchResults?.data?.map((location, index) => (
          <div key={index}>
            <Link
              href={{
                pathname: "/weather",
                // TODO how to type // pass type to ServerComponent
                query: {
                  lat: location.lat,
                  lon: location.lon,
                  name: location.name,
                  country: location.country,
                },
              }}
              onClick={() => setSearchInput("")}
            >
              <span className="text-xl">
                {location.name} - {location.country}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
