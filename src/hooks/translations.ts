import { translations } from "../utils/translations"
import { useFinalLocale } from "./final-locale"

export const useTranslations = () => {
  const finalLocale = useFinalLocale()
  return translations[finalLocale]
}
