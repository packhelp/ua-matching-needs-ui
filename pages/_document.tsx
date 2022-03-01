import { Html, Head, Main, NextScript } from 'next/document'

export default function _document() {
  return (
    <Html>
      <Head>
        <meta property="og:image" content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"/>
        <meta property="og:image:secure_url" content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}
