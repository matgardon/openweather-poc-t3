# openweather-poc-t3

small poc to explore t3 stack capabilities on openweather API
similar to what is [presented here](https://theultimateapichallenge.com/challenges/weather-typescript-api)

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

## TODO list

AUTH
[] implement NextAuth for local login/pwd management or at least magic link
[] support github SSO

FAVS
[] update prisma schema to support favorites + tRPC queries/mutations to access & edit them
[] support favs routes in app routes (favorites/list, maybe add & delete ...)
[] support ordering of favs if we preload weather for the 1st fav in our list ?

GEOLOC
[] use browser geoloc to prefetch a list of 5 locations close to our user on first render // without favs enabled
[] support dedup of results if needed (based on location proximity ? similar names ?)

WEATHER
[] support specific app routes for weather/search, weather/favs, weather/XXX (XXX=city) & weather/XXX?weekly etc
[] support search params by city + QRCodes
[] fine-tune search params: get more or less results in searchbar ?
[] support displaying hourly / daily / weekly previsions with ability to select previsions' scale in UI
[] support API icons display on UI or map to an internal icon set that fits openweather contracts

NAVIGATION
[] support loading, not-found & error pages (default fallback) => suspense & error boundaries

CI/CD
[] support cleaner secret management for OW API, DB & SSO token access
[] support vercel deploy out of curiosity ? => which PAAS for the DB ?
[] add/improve docker image & docker-compose for deploy
