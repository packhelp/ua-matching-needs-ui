import { Ticket } from "../../services/ticket.class"
import { useEffect, useState } from "react"
import maplibregl from "maplibre-gl"
import { RouteDefinitions } from "../../utils/routes"
import { isSinglePointGeometry } from "../../services/ticket.type"

import "maplibre-gl/dist/maplibre-gl.css"

export const TicketsMap = ({ tickets }: { tickets: Ticket[] }) => {
  const [map, setMap] = useState<any>()

  useEffect(() => {
    setMap(createMap())
  }, [])

  useEffect(() => {
    if (map) {
      const t = tickets || []

      t.forEach((ticket) => {
        createMarker(ticket, map)
      })
    }
  }, [tickets, map])

  return (
    <div
      id={"map-container"}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
      }}
    ></div>
  )
}

const createMap = () => {
  return new maplibregl.Map({
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
}

const createMarker = (ticket: Ticket, map) => {
  const [lat, lng] = getCoordinates(ticket)

  const description = ticket.title
    ? ticket.title
        .replaceAll(/(<([^>]+)>)/gi, "")
        .slice(0, 150)
        .replaceAll("\n", "<br />")
    : ""

  const tags = (ticket.tags || []).map((tag) => tag.need_tag_id.name).join(", ")

  const popup = new maplibregl.Popup({ offset: 25 })
    .setHTML(
      `<p class="font-bold">${tags}</p><p>${description}<br /><br /><a href="${RouteDefinitions.TicketDetails.replace(
        ":id",
        ticket.id.toString()
      )}" style="text-decoration: underline;">czytaj więcej</a></p>`
    )
    .trackPointer()

  new maplibregl.Marker().setLngLat([lat, lng]).setPopup(popup).addTo(map)
}

const getCoordinates = (ticket: Ticket): number[] => {
  if (ticket.whereDestination) {
    if (isSinglePointGeometry(ticket.whereDestination)) {
      return ticket.whereDestination?.coordinates || [0, 0]
    } else {
      return ticket.whereDestination?.geometry?.coordinates || [0, 0]
    }
  }

  return [0, 0]
}
