import React from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { translations } from "../../utils/translations"
import { externalUrls } from "../../utils/external-urls"

export const FooterNavigation = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]
  return (
    <div className="my-6 flex items-center justify-center flex-col space-x-2 text-gray-800">
      <div className="flex items-center justify-center space-x-2 py-4">
        <img src="/svg/poland-flag.svg" className="w-5 h-5" alt="Poland" />
        <span className="text-sm font-semibold">Poland</span>
        <img src="/svg/love.svg" className="w-5 h-5" alt="Poland" />
        <span className="text-sm font-semibold">Ukraine</span>
        <img src="/svg/ukraine-flag.svg" className="w-5 h-5" alt="Poland" />
      </div>
      <a className="text-xs" href={externalUrls.terms}>{`[${pageTranslations["terms-of-service"]["title-alternate"]}]`}</a>
    </div>
  )
}
