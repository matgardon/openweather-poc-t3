# openweather-poc-t3

small poc to explore t3 stack capabilities on openweather API
similar to what is [presented here](https://theultimateapichallenge.com/challenges/weather-typescript-api)

## prerequisites

- node20 (TODO: setup volta)
- docker (at least for the containerized DB)
- vscode with prettier, prisma, tailwind extensions (advised but not mandatory)

## initial setup

- NextAuth: follow steps from `.env.example` and apply to your local `.env` file to generate a local secret & add your discord API key to support discord SSO
- DB: run the `./start-database.sh` script. On first run, it will ask for a DB password or will generate one, which you must add to `.env` file.
- Prisma: run `pnpm db:generate` then `pnpm db:push`
- OpenWeatherMap: get an API_KEY from [OneCallAI 3.0](https://openweathermap.org/api/one-call-3) : you need to provide billing info but then fix the daily usage to the free tier (1000 hits/d) to not be billed for anything. Then fill that key to the corresponding env var `OPENWEATHER_APIKEY`.

## local dev

start DB & dev server

```sh
./start-database.sh  # OR docker start openweather-poc-t3-postgres
pnpm dev
```

stop dev DB

```sh
docker stop openweather-poc-t3-postgres
```

## docker build

```bash
docker build -t openweather-poc-t3 --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" openweather-poc-t3
```

then open <localhost:3000> to see your running application.

Alternatively you can use docker-compose:

```bash
docker compose up --build
```

## TODO list

AUTH

- [] implement NextAuth for local login/pwd management or at least magic link
- [] RouteGuard: check public & protected routes accessibility to authenticated users => probably only useful to save favs, not blocking to access UI for weather forecast
- [] support github SSO

FAVS

- [] update prisma schema to support favorites + tRPC queries/mutations to access & edit them
- [] support favs routes in app routes (favorites/list, maybe add & delete ...)
- [] support ordering of favs if we preload weather for the 1st fav in our list ?

GEOLOC

- [] use browser geoloc to prefetch a list of 5 locations close to our user on first render // without favs enabled
- [] support dedup of results if needed (based on location proximity ? similar names ?)
- [] autocomplete search input with found cities ? (maybe use another API for that to avoid hitting thresholds)
- [] support fuzzy search to retrieve more results when typo => maybe not possible with GeocodingAPI, search the web

WEATHER

- [] support specific app routes for weather/search, weather/favs & weather/XXX?weekly etc
- [] support search params by city + zipCodes
- [] fine-tune search params: get more or less results in searchbar ?
- [] support displaying hourly / daily / weekly previsions with ability to select previsions' scale in UI
- [] support API icons display on UI or map to an internal icon set that fits openweather contracts

LAYOUT

- [] refactor layout from app to apply to all pages
- [] create proper header & maybe sidebar for favs section (or in header)

NAVIGATION

- [] support loading, not-found & error pages (default fallback) => suspense & error boundaries

CI/CD

- [] support cleaner secret management for OW API, DB & SSO token access
- [] support vercel deploy out of curiosity ? => which PAAS for the DB ?
- [] test railway deploy (<https://create.t3.gg/en/deployment/docker#deploy-to-railway>)
- [X] add/improve docker image & docker-compose for deploy
- [X] add bare-minimum readme
