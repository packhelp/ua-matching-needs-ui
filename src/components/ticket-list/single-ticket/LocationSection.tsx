import React, { useCallback, useEffect, useState } from "react"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"
import {
  isSinglePointGeometry,
  MapboxResult,
  SinglePointGeometry,
} from "../../../services/ticket.type"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
  clickable?: boolean
}

const getPlaceName = async (loc: MapboxResult | SinglePointGeometry) => {
  if (isSinglePointGeometry(loc)) {
    const location = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc.coordinates[0]},${loc.coordinates[1]}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
    ).then((res) => res.json())

    return location?.features[0]
  } else {
    return loc || null
  }
}

export const LocationSection = ({
  trip,
  clickable,
}: TicketsListSingleTicketProps) => {
  const [from, setFrom] = useState<MapboxResult | null>(null)
  const [to, setTo] = useState<MapboxResult | null>(null)

  const getReadableLocation = useCallback(async () => {
    const fromLocation = await getPlaceName(trip.whereFrom)
    setFrom(fromLocation)

    const toLocation = await getPlaceName(trip.whereTo)
    setTo(toLocation)
  }, [trip.whereFrom, trip.whereTo])

  useEffect(() => {
    getReadableLocation()
  }, [getReadableLocation])

  return (
    <LocationWrapper>
      {from && (
        <LocationTagHtml
          bgColor="#dedcd6"
          className={clickable ? "cursor-pointer" : ""}
          onClick={clickable ? getOnClick(from) : undefined}
        >
          {from.place_name}
        </LocationTagHtml>
      )}
      {from && to && <span> ↓ </span>}
      {to && (
        <LocationTagHtml
          bgColor="#dedcd6"
          className={clickable ? "cursor-pointer" : ""}
          onClick={clickable ? getOnClick(to) : undefined}
        >
          {to.place_name}{" "}
        </LocationTagHtml>
      )}
    </LocationWrapper>
  )
}

export const SingleLocationSection = ({
  location,
  clickable,
}: {
  location: MapboxResult | SinglePointGeometry
  clickable?: boolean
}) => {
  const [place, setPlace] = useState<MapboxResult | null>(null)

  const getReadableLocation = useCallback(async () => {
    const toLocation = await getPlaceName(location)
    setPlace(toLocation)
  }, [location])

  useEffect(() => {
    getReadableLocation()
  }, [getReadableLocation])

  return (
    <LocationWrapper>
      <LocationTagHtml
        className={clickable ? "cursor-pointer" : ""}
        bgColor="#dedcd6"
        onClick={clickable ? getOnClick(location) : undefined}
      >
        {place?.place_name}{" "}
      </LocationTagHtml>
    </LocationWrapper>
  )
}

const LocationWrapper = ({ children }) => {
  return (
    <div className="flex justify-around border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1 flex-col items-center">
      {children}
    </div>
  )
}

const getCoordinates = (
  location: MapboxResult | SinglePointGeometry
): number[] => {
  if (isSinglePointGeometry(location)) {
    return location.coordinates
  }

  return location.geometry.coordinates
}

const getOnClick = (location?: MapboxResult | SinglePointGeometry) => {
  const coordinates = location ? getCoordinates(location) : null
  const searchText = coordinates ? `${coordinates[1]},${coordinates[0]}` : ""

  if (location && searchText) {
    return () => {
      window.open(`https://www.google.com/maps/search/${searchText}`, "_blank")
    }
  }
}
