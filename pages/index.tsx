import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react"
import * as React from "react"
import { NextPage } from "next"
import { AddIcon, SearchIcon } from "@chakra-ui/icons"
import { Step } from "../src/components/main/Step"
import { RouteDefinitions } from "../src/utils/routes"
import { translations } from "../src/utils/translations"
import { useFinalLocale } from "../src/hooks/final-locale"

const MainPage: NextPage = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]["pages"]["main"]

  return (
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
          <Flex
            flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
            justifyContent="space-evenly"
          >
            <Link href={RouteDefinitions.AllActiveTickets}>
              <Button
                leftIcon={<SearchIcon />}
                variant="solid"
                size="lg"
                colorScheme="blue"
                marginBottom={useBreakpointValue({
                  base: "8px",
                  sm: undefined,
                })}
                isFullWidth={useBreakpointValue({ base: true, sm: false })}
              >
                {pageTranslations["show-all-button"]}
              </Button>
            </Link>
            <Link href={RouteDefinitions.AddTicket}>
              <Button
                leftIcon={<AddIcon />}
                variant="solid"
                size="lg"
                colorScheme="yellow"
                isFullWidth={useBreakpointValue({ base: true, sm: false })}
              >
                {pageTranslations["add-new-button"]}
              </Button>
            </Link>
          </Flex>
        </Stack>
        <Stack>
          <Stack
            spacing={{ base: "4", md: "5" }}
            mb="5"
            align="center"
            textAlign="center"
          >
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
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
        <Stack align="center">
          <Link href={RouteDefinitions.AddTicket}>
            <Button
              leftIcon={<AddIcon />}
              variant="solid"
              size="lg"
              colorScheme="yellow"
              marginTop="60px"
            >
              {pageTranslations["add-new-button"]}
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default MainPage
