import React from "react"
import { NextPage } from "next"
import { Heading, Flex, Box, Button, Container, Image, Text } from "@chakra-ui/react"

import Link from "next/link"

const Contact: NextPage = () => {
  return (
    <Container>
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
      <Heading as="h1" size="md" mt="50px" mb="20px">
        Autorzy narzędzia
      </Heading>
      <Text mb="20px">
        Narzędzie zostało stworzone przy współpracy Packhelp oraz Tech To The Rescue.
      </Text>
      <Image src="/logo-packhelp.svg" maxW="200px" ml="8px"/>
      <Image src="/logo-tttr.png" maxW="230px" mt="20px"/>
    </Container>
  )
}

export default Contact
