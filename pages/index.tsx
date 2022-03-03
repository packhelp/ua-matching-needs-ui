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

const MainPage: NextPage = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]["pages"]["main"]

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Box as="section" bg="bg-surface">
        <Container py={{ base: "16" }}>
          <Stack spacing={{ base: "8", md: "10" }} mb="80px">
            <Stack
              spacing={{ base: "4", md: "5" }}
              align="center"
              textAlign="center"
            >
              <Heading size={useBreakpointValue({ base: "lg", md: "2xl" })}>
                {pageTranslations.header}
              </Heading>
              <Text
                color="muted"
                maxW="2xl"
                textAlign="center"
                fontSize={useBreakpointValue({ base: "md", md: "lg" })}
                textColor="gray.600"
              >
                {pageTranslations.subheader}
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
              marginTop="16px"
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
              <Heading size={useBreakpointValue({ base: "md", lg: "lg" })}>
                {pageTranslations["steps-section"]["header"]}
              </Heading>
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
        </Container>
      </Box>
    </div>
  )
}

export default MainPage
