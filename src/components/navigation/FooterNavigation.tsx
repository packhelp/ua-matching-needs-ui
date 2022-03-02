import React from "react"
import { externalUrls } from "../../utils/external-urls"
import { useTranslations } from "../../hooks/translations"

export const FooterNavigation = () => {
  const translations = useTranslations()
  return (
    <div className="my-6 flex items-center justify-center flex-col space-x-2 text-gray-800">
      <div className="flex items-center justify-center space-x-2 py-4">
        <img src="/svg/poland-flag.svg" className="w-5 h-5" alt="Poland" />
        <span className="text-sm font-semibold">Poland</span>
        <img src="/svg/love.svg" className="w-5 h-5" alt="Poland" />
        <span className="text-sm font-semibold">Ukraine</span>
        <img src="/svg/ukraine-flag.svg" className="w-5 h-5" alt="Poland" />
      </div>
      <a className="text-xs" href={externalUrls.terms}>{`[${translations["terms-of-service"]["title-alternate"]}]`}</a>
    </div>
  )
}
