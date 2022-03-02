import {
  Box,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import * as React from "react"

interface StepProps {
  title: string
  children: React.ReactNode
  number: string
}

export const Step = (props: StepProps) => {
  const { title, children, number } = props
  return (
    <Stack
      spacing={{ base: "3", md: "6" }}
      direction={{ base: "column", md: "row" }}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      pb="15px"
    >
      <Box
        fontSize={useBreakpointValue({ base: "6xl", md: "lg" })}
        fontWeight="extrabold"
      >
        {number}
      </Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={mode("gray.600", "gray.400")}>{children}</Box>
      </Stack>
    </Stack>
  )
}
