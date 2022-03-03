import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Header } from "../src/components/navigation/Header"
import { FooterNavigation } from "../src/components/navigation/FooterNavigation"
import { SessionProvider } from "next-auth/react"

import "react-toastify/dist/ReactToastify.css"

import { Hydrate, QueryClient, QueryClientProvider } from "react-query"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for collection views (optional)
import "rc-dropdown/assets/index.css"

// used for rendering equations (optional)
import "katex/dist/katex.min.css"

// Override notion css
import "./../public/notion-override.css"
import { RootContainerWrapper } from "../src/services/_container.root-wrapper"
import { Guard } from "../src/components/auth/Guard"
import { Container } from "../src/components/layout/Container"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <RootContainerWrapper>
              <ToastContainer style={{ zIndex: 9999999 }} />
              <Header />
              <Container>
                <Guard>
                  <Component {...pageProps} />
                </Guard>
              </Container>
              <FooterNavigation />
            </RootContainerWrapper>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
