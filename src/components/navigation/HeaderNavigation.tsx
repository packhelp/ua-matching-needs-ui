import React, { useEffect } from "react"
import {
  chakra,
  Flex,
  IconButton,
  Box,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { NavigationLinks } from "./NavigationLinks"
import { Logo } from "./Logo"
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
      mb={10}
      position="sticky"
      top={0}
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
      display={{ base: "none", sm: "none", md: "flex" }}
    >
      <Logo />
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
      display={{ base: "flex", sm: "flex", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        paddingRight={"10px"}
      >
        <Logo />
        <IconButton
          display={{ base: "flex", md: "none" }}
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
