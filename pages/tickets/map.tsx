import type { NextPage } from "next"
import { Container, Heading, Stack } from "@chakra-ui/react"
import maplibregl from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getUserInfo } from "../../src/services/auth"
import { TICKET_STATUS } from "./add"
import axios from "axios"
import { isTicketActive } from "../ticket/[id]"
import { RouteDefinitions } from "../../src/utils/routes"

const isActiveWithSingleLocation = (ticket: any): boolean => {
  return (
    isTicketActive(ticket) &&
    !!ticket.location &&
    ticket.location.type === "Point"
  )
}

const getAllActiveTicketsWithLocation = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need?filter[ticket_status][_eq]=${TICKET_STATUS.ACTIVE}&fields=*.*.*&sort[]=-date_created`

  return axios
    .get(url)
    .then((response) => response.data.data.filter(isActiveWithSingleLocation))
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
      center: [21.966741438204284, 50.48740809893026],
      zoom: 6,
    })
    setMap(map)
  }, [])

  const { data: tickets } = useQuery(`tickets-active"}`, () => {
    return getAllActiveTicketsWithLocation()
  })

  useEffect(() => {
    if (map) {
      ;(tickets || []).forEach((ticket) => {
        const [lat, lng] = ticket.location.coordinates

        const description = ticket.description
          .replaceAll(/(<([^>]+)>)/gi, "")
          .slice(0, 150)
          .replaceAll("\n", "<br />")

        const tags = ticket.need_tag_id
          .map((tag) => tag.need_tag_id.name)
          .join(", ")

        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(
            `<p class="font-bold">${tags}</p><p>${description}<br /><br /><a href="${RouteDefinitions.TicketDetails.replace(
              ":id",
              ticket.id
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
