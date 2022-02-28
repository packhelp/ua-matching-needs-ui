import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { LOCAL_STORAGE_KEY_ALL_TICKETS, TicketDetails } from "../tickets/add"
import Error from "next/error"

const getLocallySavedTicketData = (id: number): TicketDetails | undefined => {
  if (typeof window !== "undefined") {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY_ALL_TICKETS)
    if (json) {
      const allTickets = JSON.parse(json)

      return allTickets.find((ticket) => ticket.id === id)
    }
  }
}

const TicketDetails: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const ticket: TicketDetails | undefined = getLocallySavedTicketData(
    Number(id)
  )

  if (!ticket) {
    return (
      <Error statusCode={404}>
        Zgłoszenia nie znaleziono lub jest juz nieaktualne.
      </Error>
    )
  }

  const expirationDate = "jutra"

  return (
    <Container>
      <Stack>
        <Heading as="h1" size="xl">
          Zapotrzebowanie
        </Heading>
        <Text color={"grey.500"}>Aktywne do: {expirationDate}</Text>
      </Stack>
    </Container>
  )
}

export default TicketDetails
