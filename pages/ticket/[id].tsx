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
import truncate from "truncate"
import { TICKET_STATUS, TicketDetails } from "../tickets/add"
import Error from "next/error"
import { getUserInfo } from "../../src/services/auth"
import { toast } from "react-toastify"
import "dayjs/locale/pl"
import "dayjs/plugin/relativeTime"
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"

import { FacebookIcon, TelegramIcon, TwitterIcon } from "react-share"

import { useMutation, useQuery } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../../src/utils/routes"
import Head from "next/head"
import { useMemo } from "react"
import { metaData } from "../../src/utils/meta-data"
import { translations } from "../../src/utils/translations"
import { useFinalLocale } from "../../src/hooks/final-locale"
import dayjs from "dayjs"

const getTicketDataFromEndpoint = async (
  id: number
): Promise<TicketDetails> => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`

  const response = await axios.get(url)
  const { data } = response.data

  return data
}

export const isTicketActive = (ticket: TicketDetails): boolean => {
  return (
    dayjs(ticket.expirationTimestampSane) > dayjs(Date.now()) &&
    ticket.ticket_status === TICKET_STATUS.ACTIVE
  )
}

const TicketDetails: NextPage = () => {
  const router = useRouter()
  const finalLocale = useFinalLocale()

  const { id } = router.query

  const { data: ticket, isLoading } = useQuery<TicketDetails | undefined>(
    `ticket-data-${id}`,
    () => {
      if (id) {
        return getTicketDataFromEndpoint(Number(id))
      }
    }
  )

  const description = useMemo(() => {
    if (!ticket) {
      return metaData.description
    }

    const fullDescription = truncate(
      `${translations[finalLocale]["pages"]["ticket"]["description"]["need"]}: ${ticket?.what} | ${metaData.description}`,
      100
    )

    return `${fullDescription}...${translations[finalLocale]["pages"]["ticket"]["description"]["read-more"]}`
  }, [ticket?.what, finalLocale])

  const removeTicketMutation = useMutation<number, Error, number>(
    (id: number) => {
      return axios.patch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}`,
        {
          ticket_status: TICKET_STATUS.DELETED,
        }
      )
    },
    {
      onSuccess: () => {
        toast.success("Ogłoszenie usunięte. Mozesz dodać kolejne.")
        return router.push(RouteDefinitions.AddTicket)
      },
    }
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
    if (id) {
      removeTicketMutation.mutate(Number(id))
    } else {
      toast.error("Wystąpił błąd z usuwaniem zgłoszenia")
    }
  }

  const formattedExpiration = dayjs(ticket.expirationTimestampSane)
    .locale("pl")
    .format("DD.MM.YYYY HH:mm")
    .toString()

  const ticketUrl = window.location.href

  return (
    <>
      <Head>
        <meta property="description" content={description} key="description" />
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      </Head>
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
          {isTicketActive(ticket) ? (
            <Text color={"grey.500"}>
              Aktywne do:{" "}
              <Text as={"span"} fontWeight="bold">
                {formattedExpiration}
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

        {ticket.count && ticket.count > 0 ? (
          <Stack mb={8}>
            <Text color={"grey.200"} fontSize={"sm"}>
              Ile potrzeba?
            </Text>
            <Text>{ticket.count}</Text>
          </Stack>
        ) : null}
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
    </>
  )
}

export default TicketDetails
