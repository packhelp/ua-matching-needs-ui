import type { NextPage } from "next"
import { Container, Heading, Stack } from "@chakra-ui/react"
import maplibregl from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../../src/utils/routes"
import {
  isSinglePointGeometry,
  TICKET_STATUS,
} from "../../src/services/ticket.type"
import {
  TICKET_DETAILS_FIELDS,
  TICKET_LIST_FIELDS,
} from "../../src/utils/directus-fields"
import { Ticket } from "../../src/services/ticket.class"

const getAllActiveTicketsWithLocation = async () => {
  const fields = [...TICKET_LIST_FIELDS, ...TICKET_DETAILS_FIELDS].join(",")
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}&fields=${fields}&sort[]=-date_created`

  return axios.get(url).then((response) => response.data.data)
}

const TicketsMap: NextPage = () => {
  const [map, setMap] = useState<any>()

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map-container",
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              'Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center: [19.526849, 52.078222],
      zoom: 5,
    })
    setMap(map)
  }, [])

  const { data: tickets } = useQuery(`tickets-active"}`, () => {
    return getAllActiveTicketsWithLocation()
  })

  useEffect(() => {
    if (map) {
      const t = tickets || []
      t.forEach((ticketData) => {
        const ticket = new Ticket(ticketData)

        const [lat, lng] = getCoordinates(ticket)

        const description = ticket.title
          ? ticket.title
              .replaceAll(/(<([^>]+)>)/gi, "")
              .slice(0, 150)
              .replaceAll("\n", "<br />")
          : ""

        const tags = ticket.tags.map((tag) => tag.need_tag_id.name).join(", ")

        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(
            `<p class="font-bold">${tags}</p><p>${description}<br /><br /><a href="${RouteDefinitions.TicketDetails.replace(
              ":id",
              ticket.id.toString()
            )}" style="text-decoration: underline;">czytaj więcej</a></p>`
          )
          .trackPointer()

        new maplibregl.Marker().setLngLat([lat, lng]).setPopup(popup).addTo(map)
      })
    }
  }, [tickets, map])

  return (
    <Container>
      <Stack>
        <Heading>Zgłoszenia na mapie</Heading>
        <div
          id={"map-container"}
          style={{ width: "100%", height: "calc(100vh - 200px)" }}
        ></div>
      </Stack>
    </Container>
  )
}

export default TicketsMap

const getCoordinates = (ticket: Ticket): number[] => {
  if (ticket.whereDestination) {
    if (isSinglePointGeometry(ticket.whereDestination)) {
      return ticket.whereDestination.coordinates
    } else {
      return ticket.whereDestination.geometry.coordinates
    }
  }

  return [0, 0]
}
