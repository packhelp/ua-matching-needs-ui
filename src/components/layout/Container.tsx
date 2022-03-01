import React, { FC } from "react"
import { Box, Flex } from "@chakra-ui/react"

export const Container: FC = ({ children }) => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Box
        w="100%"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
      >
        {children}
      </Box>
    </Flex>
  )
}
