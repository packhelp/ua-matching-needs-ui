import React from "react"
import {
  Box,
  Heading,
  Link,
  Spinner,
  Text,
  Flex,
  Divider, Button,
} from "@chakra-ui/react"
import { RouteDefinitions } from "../utils/routes"
import { TICKET_STATUS } from "../../pages/tickets/add"

export const Tickets = ({
  status,
  tickets,
  isLoading,
}: {
  status: TICKET_STATUS
  tickets: any
  isLoading?: boolean
}) => {

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="md" mb={4}>
          {status === TICKET_STATUS.ACTIVE ? "Aktywne" : "Nieaktywne"}{" "}
          zapotrzebowanie
        </Heading>
        {tickets && <Text>Zgłoszeń: {tickets.length}</Text>}
      </Flex>

      {isLoading && <Spinner />}

      <Flex flexDirection="column">
        {tickets &&
          tickets.map((ticket) => {
            const dateFormatted = new Date(ticket.date_created).toLocaleString("pl-PL")
            return (
              <Box
                key={ticket.id}
                marginBottom="16px"
              >
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Box padding="8px">
                    <Flex justifyContent="space-between">
                      <Box />
                      <Box>
                        <Heading size="xs">
                          {dateFormatted}
                        </Heading>
                      </Box>
                    </Flex>

                    <Divider marginBottom="16px" marginTop="8px"/>

                    <Flex flexDirection="column" justifyContent="space-between">
                      <Heading size="xs" marginBottom="8px">
                        Co potrzebne:
                      </Heading>
                      <Text fontSize='sm'>
                        {ticket.what}
                      </Text>
                    </Flex>

                    <Divider marginBottom="16px" marginTop="16px"/>

                    <Flex flexDirection="column" justifyContent="space-between">
                      <Heading size="xs" marginBottom="8px">
                        Gdzie potrzebne:
                      </Heading>
                      <Text fontSize='sm'>
                        {ticket.where}
                      </Text>
                    </Flex>
                  </Box>
                  <Link href={RouteDefinitions.TicketDetails.replace(":id", ticket.id)}>
                    <Button
                      size="sm"
                      variant={"solid"}
                      width="100%"
                      borderRadius="none"
                    >
                      Przejdz
                    </Button>
                  </Link>
                </Box>
              </Box>
            )
          })}
      </Flex>
    </Box>
  )
}
