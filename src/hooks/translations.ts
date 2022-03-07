import { useFinalLocale } from "./final-locale"
import { translations } from "../translations/definitions"

export const useTranslations = () => {
  const finalLocale = useFinalLocale()

  return translations[finalLocale]
}
