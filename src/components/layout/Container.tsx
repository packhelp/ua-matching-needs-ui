import React, { FC } from "react"
import { Box, Flex } from "@chakra-ui/react"
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
          content="http://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
          key="og-image"
        />
        <meta
          property="og:image:secure_url"
          content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
          key="og-image-secure"
        />
        <link
          rel="icon"
          href="http://ua-matching-needs.herokuapp.com/ukraine.svg"
          type="image/svg+xml"
          key="icon"
        ></link>
      </Head>

      <div className="bg-slate-100 max-w-3xl mx-auto sm:px-6 lg:px-8 py-4 min-h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg h-auto">
          <div className="">{children}</div>
          {/* <div className="px-4 py-5 sm:p-6">{children}</div> */}
        </div>
      </div>
    </>
  )
}
