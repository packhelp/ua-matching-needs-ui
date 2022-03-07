import { useRouter } from "next/router"
import { Locale } from "../translations/definitions"

export const useFinalLocale = () => {
  let finalLocale: Locale = "pl-PL"
  const router = useRouter()

  if (router.locale != null) {
    finalLocale = router.locale as any as Locale
  }

  return finalLocale
}
