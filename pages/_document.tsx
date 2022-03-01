import { Html, Head, Main, NextScript } from "next/document"
import { metaData } from "../src/utils/meta-data"

export default function _document() {
  return (
    <Html>
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
