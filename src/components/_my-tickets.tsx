import {
  Box,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { RouteDefinitions } from "../utils/routes"
import { TICKET_STATUS } from "../../pages/tickets/add"

export const MyTickets = ({
  status,
  tickets
}: {
  status: TICKET_STATUS
  tickets: any
}) => {

  return (
    <Container>
      <Heading mb={4}>
        {status === TICKET_STATUS.ACTIVE ? "Aktywne" : "Nieaktywne"}{" "}
        zapotrzebowanie
      </Heading>

      {tickets && <Text>Wszystkich zgłoszeń: {tickets.length}</Text>}

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
