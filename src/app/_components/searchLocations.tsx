"use client";

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
    300,
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
    <div className="w-full max-w-xs">
      <input
        type="text"
        placeholder="Search for a city"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <div>
        {searchResults?.data?.map((location) => (
          <div key={`${location.name}-${location.lat}-${location.lon}`}>
            {location.name} - {location.country}
          </div>
        ))}
      </div>
    </div>
  );
}
