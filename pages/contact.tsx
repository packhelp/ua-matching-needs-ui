import React from "react"
import { NextPage } from "next"
import {
  Heading,
  Flex,
  Box,
  Button,
  Image,
  Text,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Link as ChakraLink } from '@chakra-ui/react'

import { useFinalLocale } from "../src/hooks/final-locale"
import { translations } from "../src/utils/translations"
import { externalUrls } from "../src/utils/external-urls"

const Contact: NextPage = () => {
  const finalLocale = useFinalLocale()
  const pageTranslations = translations[finalLocale]
  return (
    <>
      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" size="sm" mt="8px" mb="16px">
            {pageTranslations["contact"]["authors"]}
          </Heading>
        </Flex>
        <Flex
          justifyContent={"space-around"}
          alignItems="center"
          flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
          cursor="pointer"
        >
          <ChakraLink href={externalUrls.packhelp}>
            <Image src="/logo-packhelp.svg" maxW="120px" />
          </ChakraLink>
          <ChakraLink href={externalUrls.techtotherescue}>
            <Image src="/logo-tttr.png" maxW="160px" mt="8px"/>
          </ChakraLink>
        </Flex>
      </div>

      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" size="sm" mt="8px" mb="16px">
            {pageTranslations["contact"]["contact-us-via"]}
          </Heading>
        </Flex>
        <Flex padding="16px" justifyContent="space-evenly">
          <ChakraLink href={externalUrls.discord}>
            <Button size="sm" variant={"ghost"}>
              {pageTranslations["contact"]["discord"]}
            </Button>
          </ChakraLink>
          <ChakraLink href={externalUrls.github}>
            <Button size="sm" variant={"ghost"}>
              {pageTranslations["contact"]["github"]}
            </Button>
          </ChakraLink>
        </Flex>
        <Divider />
        <Flex flexDirection="column" alignItems="center" marginTop="16px">
          <ChakraLink href={externalUrls.terms} isExternal>
            <Text fontSize="xs" variant={"ghost"} cursor="pointer">
              {`[${pageTranslations["terms-of-service"]["title-alternate"]}]`}
            </Text>
          </ChakraLink>
        </Flex>
      </div>
    </>
  )
}

export default Contact
