import React from "react"
import {
  Box,
  Heading,
  Spinner,
  Text,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react"
import { useQuery } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../utils/routes"
import { isTicketActive } from "../../pages/ticket/[id]"
import { TICKET_STATUS } from "../../pages/tickets/add"
import { getUserInfo } from "../services/auth"
import { useRouter } from "next/router"

const isMineTicket = (item, userInfo) => {
  if (!userInfo) {
    return true
  } else {
    return item.phone === userInfo.phone
  }
}

export const Tickets = ({
  mineOnly,
  status,
}: {
  mineOnly: boolean
  status: TICKET_STATUS
}) => {
  const userInfo = getUserInfo()
  const router = useRouter()

  const { data: tickets, isLoading } = useQuery(
    `tickets-${status}-${mineOnly ? "mine" : "all"}`,
    () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}`

      return axios.get(url).then((response) =>
        response.data.data
          .filter((item) => {
            if (status === TICKET_STATUS.ACTIVE) {
              return isTicketActive(item)
            } else {
              return !isTicketActive(item)
            }
          })
          .filter((item) => {
            if (mineOnly) {
              return isMineTicket(item, userInfo)
            } else {
              return item
            }
          })
      )
    }
  )

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
            const tickerUrl = RouteDefinitions.TicketDetails.replace(":id", ticket.id)
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
                      <Text fontSize='sm' marginBottom="8px">
                        {ticket.where}
                      </Text>
                    </Flex>
                  </Box>
                  <Button
                    size="sm"
                    variant={"solid"}
                    width="100%"
                    borderRadius="md"
                    borderTopRadius={0}
                    colorScheme={"blue"}
                    onClick={() => router.push(tickerUrl)}
                  >
                    Szczegóły
                  </Button>
                </Box>
              </Box>
            )
          })}
      </Flex>
    </Box>
  )
}
