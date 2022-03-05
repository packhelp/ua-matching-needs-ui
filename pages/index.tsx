import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react"
import * as React from "react"
import { NextPage } from "next"
import { Step } from "../src/components/main/Step"
import { translations } from "../src/utils/translations"
import { useFinalLocale } from "../src/hooks/final-locale"
import { AddTicketButton } from "../src/components/AddTicketButton"
import { SearchTicketsButton } from "../src/components/SearchTicketsButton"
import { RouteDefinitions } from "../src/utils/routes"

const MainPage: NextPage = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]["pages"]["main"]

  return (
    <>
        <div className="relative bg-white pt-2 pb-16 rounded-xl sm:pb-24">

            <main className="mt-16 mx-auto max-w-5xl px-4 sm:mt-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Platforma łącząca osoby potrzebujące pomocy z osobami, które chcą pomoc</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Zgłoś swoją potrzebę, a my przekażemy Twoją prośbę do organizacji i osób, które pomogą Ci to zorganizować.
                  Pomagasz innym? Pomożemy Ci zorganizować pomoc!
                </p>
                <div className="mt-5 max-w-ld mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <a href={RouteDefinitions.AllActiveTickets} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Sprawdź Potrzeby
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
          <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
        </svg>
                        </a>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a href={RouteDefinitions.AddTicket} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-800 bg-yellow-300 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10">
                      Zgłoś Potrzebę
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
                    </a>
                  </div>
                </div>
              </div>
            </main>

          </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 mb-12 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">Jak to działa?</p>
    <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <dt>
              <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
  </svg>
              </div>
              <p className="mt-5 text-lg leading-6 font-medium text-gray-900">1. Zgłaszasz potrzebę</p>
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Podajesz numer telefonu i wpisujesz to, czego potrzebujesz i gdzie chcesz to dostarczyć.
            </dd>
          </div>

          <div>
            <dt>
              <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
  </svg>
              </div>
              <p className="mt-5 text-lg leading-6 font-medium text-gray-900">2. Publikujemy i szukamy rozwiązania</p>
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Twoją potrzebę przekazujemy organizacjom i osobom, które mają to, czego potrzebujesz i pomogą Ci zorganizować pomoc.
            </dd>
          </div>

          <div>
            <dt>
              <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
              </div>
              <p className="mt-5 text-lg leading-6 font-medium text-gray-900">3. Dezaktywujemy stare potrzeby</p>
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Ogłoszenie wygasa automatycznie po 24 godzinach lub wtedy kiedy je usuniesz - nie będziesz dostawać setek telefonów.
            </dd>
          </div>
        </dl>
        </div>
      </div>

      <div className="bg-white w-full rounded-xl">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 mb-12 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">Dla kogo jest ta platforma?</p>
            <div className="text-lg font-normal leading-9 text-gray-800">
              <div>1. Dla organizatorów i koordynatorów zbiórek i pomocy dla Ukrainy</div>
              <div>2. Dla punktów recepcyjnych na granicach</div>
              <div>3. Dla każdego, kto chce zorganizować pomoc!</div>
            </div>
          </div>
        </div>
      </div>


    <div className="bg-white shadow rounded-lg hidden max-w-4xl mx-auto">
      <Box as="section" bg="bg-surface">
        <Container py={{ base: "16" }}>
          <Stack spacing={{ base: "8", md: "10" }} mb={20}>
            <Stack
              spacing={{ base: "4", md: "5" }}
              align="center"
              textAlign="center"
            >
              <Heading as="h1" mb={5}>
                {pageTranslations.header}
              </Heading>
              <Heading as="h2" size="md">
                {pageTranslations.subheader}
              </Heading>
              <Text
                color="muted"
                maxW="2xl"
                textAlign="center"
                fontSize="md"
                textColor="gray.600"
              >
                {pageTranslations.description}
              </Text>
            </Stack>
            <HStack
              justifyContent="space-evenly"
              display={{ base: "none", md: "flex" }}
            >
              <SearchTicketsButton />
              <AddTicketButton />
            </HStack>
            <Flex
              flexDirection="column"
              alignItems="center"
              marginTop={3}
              justifyContent="space-between"
              display={{ base: "flex", md: "none" }}
            >
              <div className="pb-4 w-64">
                <SearchTicketsButton />
              </div>
              <div className="pb-4 w-64">
                <AddTicketButton />
              </div>
            </Flex>
          </Stack>
          <Stack>
            <Stack
              spacing={{ base: "4", md: "5" }}
              mb="5"
              align="center"
              textAlign="center"
            >
              <Heading>{pageTranslations["steps-section"]["header"]}</Heading>
            </Stack>
            <Step
              number="1."
              title={pageTranslations["steps-section"]["step-1-title"]}
            >
              {pageTranslations["steps-section"]["step-1-description"]}
            </Step>
            <Step
              number="2."
              title={pageTranslations["steps-section"]["step-2-title"]}
            >
              {pageTranslations["steps-section"]["step-2-description"]}
            </Step>
            <Step
              number="3."
              title={pageTranslations["steps-section"]["step-3-title"]}
            >
              {pageTranslations["steps-section"]["step-3-description"]}
            </Step>
          </Stack>
          <Stack align="center" marginTop="16px">
            <AddTicketButton />
          </Stack>
          <Stack mt={20}>
            <Stack
              spacing={{ base: "4", md: "5" }}
              mb="5"
              align="center"
              textAlign="center"
            >
              <Heading>
                {pageTranslations["for-whom-section"]["header"]}
              </Heading>
            </Stack>
            <Step
              number="1."
              title={pageTranslations["for-whom-section"]["list-item-1"]}
            />
            <Step
              number="2."
              title={pageTranslations["for-whom-section"]["list-item-2"]}
            />
            <Step
              number="3."
              title={pageTranslations["for-whom-section"]["list-item-3"]}
            />
          </Stack>
        </Container>
      </Box>
    </div>
    </>
  )
}

export default MainPage
