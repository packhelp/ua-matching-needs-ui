import React from "react"
import { NextPage } from "next"
import {
  Heading,
  Flex,
  Button,
  Image,
  Text,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Link } from '@chakra-ui/react'

import { translations } from "../src/utils/translations"
import { externalUrls } from "../src/utils/external-urls"
import { useTranslations } from "../src/hooks/translations"

const Contact: NextPage = () => {
  const translations = useTranslations()
  return (
    <>
      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" size="sm" mt="8px" mb="16px">
            {translations["contact"]["authors"]}
          </Heading>
        </Flex>
        <Flex
          justifyContent={"space-around"}
          alignItems="center"
          flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
          cursor="pointer"
        >
          <Link href={externalUrls.packhelp}>
            <Image src="/logo-packhelp.svg" maxW="120px" />
          </Link>
          <Link href={externalUrls.techtotherescue}>
            <Image src="/logo-tttr.png" maxW="160px" mt="8px"/>
          </Link>
        </Flex>
      </div>

      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" size="sm" mt="8px" mb="16px">
            {translations["contact"]["contact-us-via"]}
          </Heading>
        </Flex>
        <Flex padding="16px" justifyContent="space-evenly">
          <Link href={externalUrls.discord}>
            <Button size="sm" variant={"ghost"}>
              {translations["contact"]["discord"]}
            </Button>
          </Link>
          <Link href={externalUrls.github}>
            <Button size="sm" variant={"ghost"}>
              {translations["contact"]["github"]}
            </Button>
          </Link>
        </Flex>
      </div>

      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h2" size="sm" mt="8px" mb="16px">
            {translations["terms-of-service"]["title"]}
          </Heading>
        </Flex>
        <Flex flexDirection="column" alignItems="center" marginTop="16px">
          <Link href={externalUrls.terms} isExternal>
            <Text fontSize="xs" variant={"ghost"} cursor="pointer">
              {`[${translations["terms-of-service"]["title-alternate"]}]`}
            </Text>
          </Link>
        </Flex>
      </div>
    </>
  )
}

export default Contact
