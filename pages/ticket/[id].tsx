import {
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import {
  LOCAL_STORAGE_KEY_ALL_TICKETS,
  TICKET_STATUS,
  TicketData,
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
} from "react-share"

import { FacebookIcon, TelegramIcon, TwitterIcon } from "react-share"

import { useQuery } from "react-query"
import axios from "axios"

const getLocallySavedTicketData = (id: number): TicketDetails | undefined => {
  if (typeof window !== "undefined") {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY_ALL_TICKETS)
    if (json) {
      const allTickets = JSON.parse(json)

      return allTickets.find((ticket) => ticket.id === id)
    }
  }
}

const getTicketDataFromEndpoint = async (id: number): TicketDetails => {
  if (isNaN(id)) {
    return
  }

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`

  const response = await axios.get(url)
  const { data } = response.data
  const ticketDetails: TicketDetails = {
    ...data,
    what: data.description,
  }

  return ticketDetails
}

const TicketDetails: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: ticket, isLoading } = useQuery<TicketDetails>(
    `ticket-data-${id}`,
    () => getTicketDataFromEndpoint(Number(id))
  )

  if (isLoading) {
    return (
      <Container>
        <Text>Ładowanie informacji o zapotrzebowaniu...</Text>
      </Container>
    )
  }

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

  const formatedExpiration = ticket.expirationTimestamp
    ? format(ticket.expirationTimestamp, "dd MMMM yyyy HH:mm", {
        locale: pl,
      })
    : null

  const ticketUrl = window.location.href

  return (
    <Container>
      <Heading as="h1" size="xl">
        Zapotrzebowanie
      </Heading>

      <Flex padding="8px 0">
        <Heading as="h3" size="m">
          Udostępnij:
        </Heading>
        <Box paddingLeft="4px">
          <FacebookShareButton url={ticketUrl}>
            <FacebookIcon size={24} />
          </FacebookShareButton>
        </Box>
        <Box paddingLeft="4px">
          <TelegramShareButton url={ticketUrl}>
            <TelegramIcon size={24} />
          </TelegramShareButton>
        </Box>
        <Box paddingLeft="4px">
          <TwitterShareButton url={ticketUrl}>
            <TwitterIcon size={24} />
          </TwitterShareButton>
        </Box>
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
