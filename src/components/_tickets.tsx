import {
  Box,
  Container,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useQuery } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../utils/routes"
import { isTicketActive } from "../../pages/ticket/[id]"
import { TICKET_STATUS } from "../../pages/tickets/add"
import { getUserInfo } from "../services/auth"

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
    <Container>
      <Heading mb={4}>
        {status === TICKET_STATUS.ACTIVE ? "Aktywne" : "Nieaktywne"}{" "}
        zapotrzebowanie
      </Heading>

      {tickets && <Text>Wszystkich zgłoszeń: {tickets.length}</Text>}

      {isLoading && <Spinner />}

      <Stack>
        {tickets &&
          tickets.map((ticket) => {
            return (
              <Link
                key={ticket.id}
                href={RouteDefinitions.TicketDetails.replace(":id", ticket.id)}
              >
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Box
                    mt="1"
                    p={"4"}
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {ticket.what}
                  </Box>
                </Box>
              </Link>
            )
          })}
      </Stack>
    </Container>
  )
}
