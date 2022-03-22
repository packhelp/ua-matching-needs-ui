import type { NextPage } from "next"
import { Container, Heading, Stack } from "@chakra-ui/react"

import { useQuery } from "react-query"
import axios from "axios"
import { TICKET_STATUS } from "../../src/services/ticket.type"
import {
  TICKET_DETAILS_FIELDS,
  TICKET_LIST_FIELDS,
} from "../../src/utils/directus-fields"
import { Ticket } from "../../src/services/ticket.class"
import { TicketsMap } from "../../src/components/map/TicketsMap"

const getAllActiveTicketsWithLocation = async () => {
  const fields = [...TICKET_LIST_FIELDS, ...TICKET_DETAILS_FIELDS].join(",")
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}&fields=${fields}&sort[]=-date_created`

  return axios.get(url).then((response) => response.data.data)
}

const TicketsMapPage: NextPage = () => {
  const { data } = useQuery(`tickets-active"}`, () => {
    return getAllActiveTicketsWithLocation()
  })
  const tickets = (data || []).map((ticket) => new Ticket(ticket))

  return (
    <Container>
      <Stack>
        <Heading>Zgłoszenia na mapie</Heading>
        <TicketsMap tickets={tickets} />
      </Stack>
    </Container>
  )
}

export default TicketsMapPage
