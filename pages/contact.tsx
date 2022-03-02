import React from "react"
import { NextPage } from "next"
import { Heading, Flex, Box, Button, Container, Image, Text, useBreakpointValue } from "@chakra-ui/react"

import Link from "next/link"

const Contact: NextPage = () => {
  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <Heading as="h1" size="xl" mb="20px">
          Skontaktuj się z nami przez:
        </Heading>
        <Flex padding="16px" flexDirection="column">
          <Link href={"https://discord.gg/Sk3dKFrXPa"}>
            <Button size="sm" variant={"solid"}>
              Discord
            </Button>
          </Link>
          <Box paddingBottom="8px" />
          <Link href={"https://github.com/packhelp/ua-matching-needs-ui"}>
            <Button size="sm" variant={"solid"}>
              Github
            </Button>
          </Link>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h1" size="md" mt="50px" mb="40px">
            Autorzy narzędzia
          </Heading>
          <Text mb="20px" display={{ base: "none", md: "flex"}}>
            Narzędzie zostało stworzone przy współpracy
          </Text>
        </Flex>
        <Flex
          justifyContent={"space-around"}
          alignItems="center"
          flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
        >
          <Image src="/logo-packhelp.svg" maxW="160px" ml="8px"/>
          <Image src="/logo-tttr.png" maxW="230px"/>
        </Flex>
      </Container>
    </div>
  )
}

export default Contact
