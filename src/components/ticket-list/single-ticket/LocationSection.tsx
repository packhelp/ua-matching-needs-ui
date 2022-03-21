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
  needId: number
}

const getUpdatedPlaceName = async (
  loc: MapboxResult | SinglePointGeometry,
  needId: number,
  field: "where_destination" | "where_from"
) => {
  if (isSinglePointGeometry(loc)) {
    const [lat, long] = loc.coordinates
    const location = await fetch(
      `/api/get-location/?lat=${lat}&long=${long}&needId=${needId}&field=${field}`
    ).then((res) => res.json())

    return location
  } else {
    return loc || null
  }
}

export const LocationSection = ({
  trip,
  clickable,
  needId,
}: TicketsListSingleTicketProps) => {
  const [from, setFrom] = useState<MapboxResult | null>(null)
  const [to, setTo] = useState<MapboxResult | null>(null)

  const getReadableLocation = useCallback(async () => {
    const fromLocation = await getUpdatedPlaceName(
      trip.whereFrom,
      needId,
      "where_from"
    )
    setFrom(fromLocation)

    const toLocation = await getUpdatedPlaceName(
      trip.whereTo,
      needId,
      "where_destination"
    )
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
  needId,
}: {
  location: MapboxResult | SinglePointGeometry
  clickable?: boolean
  needId: number
}) => {
  const [place, setPlace] = useState<MapboxResult | null>(null)

  const getReadableLocation = useCallback(async () => {
    const toLocation = await getUpdatedPlaceName(
      location,
      needId,
      "where_destination"
    )
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
