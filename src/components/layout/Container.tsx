import React, { FC } from "react"
import Head from "next/head"
import { useTranslations } from "../../hooks/translations"
import Script from "next/script"

export const Container: FC = ({ children }) => {
  const translations = useTranslations()

  let url = ""
  if (typeof window !== "undefined") {
    url = window.location.href
  }

  return (
    <>
      <Head>
        <title>{translations.metaData.title}</title>
        <meta
          property="description"
          content={translations.metaData.description}
          key="description"
        />
        <meta
          property="og:title"
          content={translations.metaData.title}
          key="og-title"
        />
        <meta
          property="og:description"
          content={translations.metaData.description}
          key="og-description"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:url" content={url} key="og-url" />
        <meta
          property="og:image"
          content="https://ua-matching-needs.herokuapp.com/share-banner.png"
          key="og-image"
        />
        <meta
          property="og:image:secure_url"
          content="https://ua-matching-needs.herokuapp.com/share-banner.png"
          key="og-image-secure"
        />
        <link
          rel="icon"
          href="https://ua-matching-needs.herokuapp.com/svg/ukraine.svg"
          type="image/svg+xml"
          key="icon"
        ></link>
      </Head>

      <div className="px-4 py-4 mx-auto bg-slate-100">
        {children}

        {process.env.ENV === "production" && (
          <Script
            data-domain="potrzeby-ua.org"
            id="plausible"
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </div>
    </>
  )
}
