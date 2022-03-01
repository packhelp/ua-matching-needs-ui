import { Html, Head, Main, NextScript } from 'next/document'

export default function _document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Wesprzyj Ukraińców!" />
        <meta property="og:description" content="Wejdź na naszą platformę, zapoznaj się z potrzebami różnych instytucji i osób i wesprzyj nas w pomocy!" />
        <meta property="og:image" content="http://ua-matching-needs.herokuapp.com/ukraine-flag.jpg"/>
        <meta property="og:image:secure_url" content="https://ua-matching-needs.herokuapp.com/ukraine-flag.jpg" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}
