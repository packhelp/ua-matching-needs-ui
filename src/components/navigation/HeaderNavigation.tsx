import React, { useEffect } from "react"
import {
  chakra,
  Flex,
  IconButton,
  Box,
  Stack,
  useColorModeValue,
  useDisclosure,
  Link,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { NavigationLinks } from "./NavigationLinks"
import { Logo } from "./Logo"
import { RouteDefinitions } from "../../utils/routes"
import { useRouter } from "next/router"

export const HeaderNavigation = () => {
  const bg = useColorModeValue("white", "blue.500")
  return (
    <chakra.header
      bg={bg}
      w="full"
      px={{ base: 2, sm: 4 }}
      py={4}
      shadow="md"
      position="sticky"
      top={0}
      zIndex="100000"
    >
      <Desktop />
      <Mobile />
    </chakra.header>
  )
}

const Desktop = () => {
  return (
    <Flex
      justifyContent={"strech"}
      alignContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      display={{ base: "none", sm: "none", lg: "flex" }}
    >
      <Link href={RouteDefinitions.Main}>
        <Logo />
      </Link>
      <div style={{ flex: 1, margin: "0 16px" }}>
        <NavigationLinks />
      </div>
    </Flex>
  )
}

const Mobile = () => {
  const { isOpen = false, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = router.events.on(
      "routeChangeStart",
      (url, { shallow }) => {
        onClose()
      }
    )
  }, [])

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      display={{ base: "flex", sm: "flex", lg: "none" }}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        padding={"0 10px"}
      >
        <Logo />
        <IconButton
          display={{ base: "flex", lg: "none" }}
          alignItems={"center"}
          aria-label="Open menu"
          fontSize="20px"
          color={useColorModeValue("gray.800", "inherit")}
          variant="ghost"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <Box width={"100%"}>
          <Stack as={"nav"} spacing={4}>
            <NavigationLinks />
          </Stack>
        </Box>
      )}
    </Flex>
  )
}
