import { useRouter } from "next/router"
import { Locales } from "./translations"

export const useFinalLocale = () => {
  let finalLocale: Locales = "pl-PL"
  const router = useRouter()

  if (router.locale != null) {
    finalLocale = router.locale as any as Locales
  }

  return finalLocale
}
