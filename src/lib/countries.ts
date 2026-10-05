import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";

export type CountryOption = { code: CountryCode; name: string; dial: string };

/* Shown first in the dropdown */
export const PRIORITY_COUNTRIES: CountryCode[] = ["AE", "SA", "QA", "KW", "BH", "OM", "IN", "PK", "GB", "US"];

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const all: CountryOption[] = getCountries().map((code) => ({
  code,
  name: regionNames.of(code) ?? code,
  dial: `+${getCountryCallingCode(code)}`,
}));

export const priorityCountries = PRIORITY_COUNTRIES.map((c) => all.find((o) => o.code === c)).filter(
  (o): o is CountryOption => Boolean(o)
);

export const otherCountries = all
  .filter((o) => !PRIORITY_COUNTRIES.includes(o.code))
  .sort((a, b) => a.name.localeCompare(b.name));

export const findCountry = (code: string) => all.find((o) => o.code === code);