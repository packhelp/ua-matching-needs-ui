import {
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import {
  LOCAL_STORAGE_KEY_ALL_TICKETS,
  TICKET_STATUS,
  TicketDetails,
} from "../tickets/add"
import Error from "next/error"
import { getUserInfo } from "../../src/services/auth"
import { toast } from "react-toastify"
import { parseISO, format } from "date-fns"
import { pl } from "date-fns/locale"
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

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

  const userInfo = getUserInfo()
  const isOwner = userInfo && userInfo.phone === ticket.phone

  const removeTicket = () => {
    toast.error("Not implemented yet!")
  }

  const formatedExpiration = format(
    ticket.expirationTimestamp,
    "dd MMMM yyyy HH:mm",
    {
      locale: pl,
    }
  )

  const ticketUrl = window.location.href

  return (
    <Container>
      <Heading as="h1" size="xl">
        Zapotrzebowanie
      </Heading>

      <Flex>
        <Heading as="h3" size="m">
          Udostępnij
        </Heading>
        <FacebookShareButton url={ticketUrl} >
          <FacebookIcon />
        </FacebookShareButton>
      </Flex>

      <Stack mb={8}>
        {ticket.status === TICKET_STATUS.ACTIVE ? (
          <Text color={"grey.500"}>
            Aktywne do:{" "}
            <Text as={"span"} fontWeight="bold">
              {formatedExpiration}
            </Text>
          </Text>
        ) : (
          <Text color={"red"}>Zapotrzebowanie nieaktywne!</Text>
        )}
      </Stack>

      <Stack mb={8}>
        <Text color={"grey.200"} fontSize={"sm"}>
          Co potrzeba?
        </Text>
        <Text>{ticket.what}</Text>
      </Stack>

      {ticket.count && (
        <Stack mb={8}>
          <Text color={"grey.200"} fontSize={"sm"}>
            Ile potrzeba?
          </Text>
          <Text>{ticket.count}</Text>
        </Stack>
      )}
      {ticket.where && (
        <Stack mb={8}>
          <Text color={"grey.200"} fontSize={"sm"}>
            Gdzie dostarczyć?
          </Text>
          <Text>{ticket.where}</Text>
        </Stack>
      )}
      {ticket.who && (
        <Stack mb={8}>
          <Text color={"grey.200"} fontSize={"sm"}>
            Kto zgłosił zapotrzebowanie?
          </Text>
          <Text>{ticket.who}</Text>
        </Stack>
      )}

      <Stack mb={8}>
        <Text color={"grey.200"} fontSize={"sm"}>
          Telefon
        </Text>
        <Link href={`tel:${ticket.phone}`}>{ticket.phone}</Link>
      </Stack>

      {isOwner && (
        <Stack>
          <Button onClick={removeTicket}>Usuń</Button>
        </Stack>
      )}
    </Container>
  )
}

export default TicketDetails
