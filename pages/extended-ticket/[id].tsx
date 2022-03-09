import type { NextPage } from "next"
import "dayjs/locale/pl"
import "dayjs/plugin/relativeTime"
import { RouteDefinitions } from "../../src/utils/routes"
import React from "react"
import { useTranslations } from "../../src/hooks/translations"
import { TicketDetailsType } from "../../src/services/ticket.type"
import { getRootContainer } from "../../src/services/_root-container"
import { useRouter } from "next/router"
import { Box, Container, Heading, Link, Stack, Text } from "@chakra-ui/react"
import dayjs from "dayjs"

const root = getRootContainer()
const ticketService = root.containers.ticketService

export async function getServerSideProps(context) {
  const { id } = context.query
  const ticket = await ticketService.ticketWithNestedData(Number(id))

  return { props: { ticket } }
}

const ExtendedTicket: NextPage<{ ticket: TicketDetailsType }> = ({
  ticket,
}) => {
  const router = useRouter()
  const translations = useTranslations()
  const { locale } = router
  const ticketUrl = RouteDefinitions.TicketDetails.replace(
    ":id",
    String(ticket.id)
  )
  const formattedExpiration = dayjs(ticket.expirationTimestampSane)
    .locale("pl")
    .format("DD.MM.YYYY HH:mm")
    .toString()

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Box as="section" bg="bg-surface">
        <Container py={{ base: "16" }}>
          <Stack spacing={{ base: "8", md: "10" }} mb={20}>
            <Stack
              spacing={{ base: "4", md: "5" }}
              align="center"
              textAlign="center"
            >
              <Heading as="h1" mb={5}>
                {translations["pages"]["extended"]["title"]}
              </Heading>
              <Text
                color="muted"
                maxW="2xl"
                textAlign="center"
                fontSize="md"
                textColor="gray.600"
              >
                {translations["pages"]["extended"]["description"]} {formattedExpiration}
              </Text>

              <Link href={ticketUrl}>
                {translations["pages"]["extended"]["showTicket"]}
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}

export default ExtendedTicket
