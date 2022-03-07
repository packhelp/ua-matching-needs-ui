import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react"
import * as React from "react"
import { NextPage } from "next"
import { Step } from "../src/components/main/Step"
import { AddTicketButton } from "../src/components/AddTicketButton"
import { SearchTicketsButton } from "../src/components/SearchTicketsButton"
import { useTranslations } from "../src/hooks/translations"

const MainPage: NextPage = () => {
  const translations = useTranslations()
  const pageTranslations = translations["pages"]["main"]

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
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
  )
}

export default MainPage
