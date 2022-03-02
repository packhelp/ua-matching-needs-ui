import React from "react"
import { NextPage } from "next"
import { Heading, Flex, Box, Button, Container, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"

import { useFinalLocale } from "../src/hooks/final-locale"
import { translations } from "../src/utils/translations"
import { externalUrls } from "../src/utils/external-urls"

const Contact: NextPage = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]
  return (
    <Container className="px-4 py-5 sm:p-6">
      <Heading as="h1" size="xl" mb="20px">
        {pageTranslations["contact"]["contact-us-via"]}
      </Heading>
      <Flex padding="16px" flexDirection="column">
        <Link href={externalUrls.discord}>
          <Button size="sm" variant={"solid"}>
            {pageTranslations["contact"]["discord"]}
          </Button>
        </Link>
        <Box paddingBottom="8px" />
        <Link href={externalUrls.github}>
          <Button size="sm" variant={"solid"}>
            {pageTranslations["contact"]["github"]}
          </Button>
        </Link>
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        <Heading as="h1" size="md" mt="50px" mb="40px">
          {pageTranslations["contact"]["authors"]}
        </Heading>
      </Flex>
      <Flex
        justifyContent={"space-around"}
        alignItems="center"
        flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
        cursor="pointer"
      >
        <Link href={externalUrls.packhelp}>
          <Image src="/logo-packhelp.svg" maxW="160px" ml="8px"/>
        </Link>
        <Link href={externalUrls.techtotherescue}>
          <Image src="/logo-tttr.png" maxW="230px"/>
        </Link>
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        <Heading as="h1" size="md" mt="50px" mb="40px">
          {pageTranslations["terms-of-service"]["title"]}
        </Heading>
        <Link href={externalUrls.terms}>
          <Button size="sm" variant={"solid"}>
            {pageTranslations["terms-of-service"]["title"]}
          </Button>
        </Link>
      </Flex>
    </Container>
  )
}

export default Contact
