import { Html, Head, Main, NextScript } from "next/document"
import { metaData } from "../src/utils/meta-data"

export default function _document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
