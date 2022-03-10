import { useEffect, useState } from "react"
import ReactMapGL from "react-map-gl"
import mapboxSdk from "@mapbox/mapbox-sdk"
import mapboxgl from "mapbox-gl"

export default function Map() {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FyYXZpZWlyYSIsImEiOiJja2d3aGNwN2swYWJuMzFvZWs5czN6OTgxIn0.dEqDrKX6EoaYohycuKvUsA"
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })
    if (mapboxClient.geocoding) {
      mapboxClient.geocoding
        .forwardGeocode({
          query: "Wellington, New Zealand",
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then((response) => {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error("Invalid response:")
            console.error(response)
            return
          }
          const feature = response.body.features[0]

          console.log(feature.center)
        })
    }
  }, [])
  return (
    <ReactMapGL
      initialViewState={{
        zoom: 14,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
    ></ReactMapGL>
  )
}
