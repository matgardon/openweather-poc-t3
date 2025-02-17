export function getWindDirection(deg: number | nullish) {
  if (isNullish(deg)) return "UNKNOWN";

  if (deg > 15 && deg <= 75) return "NE";

  if (deg > 76 && deg <= 105) return "E";
  if (deg > 105 && deg <= 165) return "SE";

  if (deg > 166 && deg <= 195) return "S";
  if (deg > 195 && deg <= 255) return "SW";

  if (deg > 255 && deg <= 285) return "W";
  if (deg > 285 && deg <= 345) return "NW";

  return "N";
}

export function getHumidityValue(level: number | nullish) {
  if (isNullish(level)) return "UNKNOWN";

  if (level <= 55) return "Dry and comfortable";
  if (level > 55 && level <= 65) return "A bit uncomfortable, sticky feeling";

  return "Lots of moisture, uncomfortable air";
}

export function getVisibilityValue(number: number | nullish) {
  if (isNullish(number)) return "UNKNOWN";

  if (number <= 50) return "Dangerously foggy";
  if (number > 50 && number <= 500) return "Expect heavy fog";
  if (number > 500 && number <= 2000) return "Expect some fog";
  if (number > 2000 && number <= 9000) return "Expect some haze";

  return "Very clear day";
}

export function getSunTime(timestamp: number | nullish) {
  if (isNullish(timestamp)) return "UNKNOWN";

  const date = new Date(timestamp * 1000);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hours.length <= 1) hours = `0${hours}`;
  if (minutes.length <= 1) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}

export function getPop(value: number | nullish) {
  if (isNullish(value)) return "UNKNOWN";

  if (value <= 0.33) return "Low probability";
  if (value > 0.33 && value <= 0.66) return "Moderate probability";

  return "High probability";
}

export type nullish = undefined | null;

export function isNullish<T>(
  argument: T | undefined | null,
): argument is undefined | null {
  return argument === null || argument === undefined;
}
