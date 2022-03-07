import { useFinalLocale } from "./final-locale"
import { PL } from "../translations/pl"
import { EN } from "../translations/en"
import { UA } from "../translations/ua"

export type Locales = "pl-PL" | "uk-UA" | "en-US"

export type Translation = typeof PL

export const translations = {
  "pl-PL": PL,
  "uk-UA": UA,
  "en-US": EN,
}

export const useTranslations = () => {
  const finalLocale = useFinalLocale()

  return translations[finalLocale]
}
