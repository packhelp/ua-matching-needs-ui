import React, { FC } from "react"
import { metaData } from "../../utils/meta-data"
import Head from "next/head"

export const Container: FC = ({ children }) => {
  let url = ""
  if (typeof window !== "undefined") {
    url = window.location.href
  }

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta
          property="description"
          content={metaData.description}
          key="description"
        />
        <meta property="og:title" content={metaData.title} key="og-title" />
        <meta
          property="og:description"
          content={metaData.description}
          key="og-description"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:url" content={url} key="og-url" />
        <meta
          property="og:image"
          content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
          key="og-image"
        />
        <meta
          property="og:image:secure_url"
          content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
          key="og-image-secure"
        />
        <link
          rel="icon"
          href="https://ua-matching-needs.herokuapp.com/svg/ukraine.svg"
          type="image/svg+xml"
          key="icon"
        ></link>
      </Head>

      <div className="px-4 py-4 mx-auto bg-slate-100">{children}</div>
    </>
  )
}
