import type { NextPage } from "next"
import { Container, Heading, Stack } from "@chakra-ui/react"
import maplibregl from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getAllActiveTickets } from "../../src/components/_tickets"
import { getUserInfo } from "../../src/services/auth"
import { TICKET_STATUS } from "./add"

const TicketsMap: NextPage = () => {
  const [map, setMap] = useState<any>()
  const userInfo = getUserInfo()

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

  const { data: tickets, isLoading } = useQuery(`tickets-active"}`, () => {
    return Promise.resolve([
      { location_lat: 21.966741438204284, location_lng: 50.48740809893026 },
    ])
    return getAllActiveTickets(TICKET_STATUS.ACTIVE, false, userInfo)
  })

  useEffect(() => {
    if (map) {
      tickets.forEach((ticket) => {
        if (ticket.location_lat && ticket.location_lng) {
          const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML(
              "<p>Testowa lokalizacja / Testowa lokalizacja / Testowa lokalizacja / Testowa lokalizacja / Testowa lokalizacja / Testowa lokalizacja / <br /><br /><a href='#'>sprawdź potrzebę</a></p>"
            )
            .trackPointer()

          new maplibregl.Marker()
            .setLngLat([ticket.location_lat, ticket.location_lng])
            .setPopup(popup)
            .addTo(map)
        }
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
