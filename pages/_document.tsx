import { Html, Head, Main, NextScript } from "next/document"
import { metaData } from "../src/utils/meta-data"

export default function _document() {
  return (
    <Html>
      <Head>
        <title>{metaData.title}</title>
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta
          property="og:image"
          content="http://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"
        />
        <link
          rel="icon"
          href="http://ua-matching-needs.herokuapp.com/ukraine.svg"
          type="image/svg+xml"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
