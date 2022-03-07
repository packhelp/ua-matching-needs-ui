import { PL } from "./pl"
import { EN } from "./en"
import { UA } from "./ua"

export type Translation = typeof PL

export enum LocaleDefinitions {
  PL = "pl-PL",
  UA = "uk-UA",
  EN = "en-US",
}

export enum LocaleFlags {
  "pl-PL" = "/svg/poland.svg",
  "uk-UA" = "/svg/ukraine.svg",
  "en-US" = "/svg/united-kingdom.svg",
}

export enum LocaleNames {
  "pl-PL" = "Polski",
  "uk-UA" = "український",
  "en-US" = "English",
}

export type Locale =
  | "pl-PL"
  | "uk-UA"
  | "en-US"

export const locales = [
  LocaleDefinitions.PL,
  LocaleDefinitions.UA,
  LocaleDefinitions.EN,
]

export const translations = {
  "pl-PL": PL,
  "uk-UA": UA,
  "en-US": EN,
}