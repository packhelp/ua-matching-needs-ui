import React from "react"
import { NextPage } from "next"
import { Heading, Flex, Box, Button } from "@chakra-ui/react"

import Link from "next/link"

const Contact: NextPage = () => {
  return (
    <>
      <Heading as="h1" size="xl">
        Skontaktuj się z nami przez:
      </Heading>
      <Flex padding="16px" flexDirection="column" >
        <Link href={"https://discord.gg/Sk3dKFrXPa"}>
          <Button size="sm" variant={"solid"}>
            Discord
          </Button>
        </Link>
        <Box paddingBottom="8px"/>
        <Link href={"https://github.com/packhelp/ua-matching-needs-ui"}>
          <Button size="sm" variant={"solid"}>
            Github
          </Button>
        </Link>
      </Flex>
    </>
  )
}

export default Contact