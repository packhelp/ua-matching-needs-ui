import React from "react"
import { LocationTagHtml } from "../../LocationTag"
import { NeedTransport } from "../../../services/ticket.class"
import truncate from "truncate"
import {
  isSinglePointGeometry,
  MapboxResult,
  SinglePointGeometry,
} from "../../../services/ticket.type"

type TicketsListSingleTicketProps = {
  trip: NeedTransport
  clickable?: boolean
}

export const LocationSection = ({
  trip,
  clickable,
}: TicketsListSingleTicketProps) => {
  const from = trip.whereFrom ? trip.whereFrom : null
  const to = trip.whereTo ? trip.whereTo : null

  const fromPlaceName = from
    ? isSinglePointGeometry(from)
      ? from.coordinates.join(",")
      : from.place_name
    : null
  const toPlaceName = to
    ? isSinglePointGeometry(to)
      ? to.coordinates.join(",")
      : to.place_name
    : null

  return (
    <LocationWrapper>
      {from && (
        <LocationTagHtml
          bgColor="#dedcd6"
          className={clickable ? "cursor-pointer" : ""}
          onClick={clickable ? getOnClick(from) : undefined}
        >
          {fromPlaceName}
        </LocationTagHtml>
      )}
      {from && to && <span> ↓ </span>}
      {to && (
        <LocationTagHtml
          bgColor="#dedcd6"
          className={clickable ? "cursor-pointer" : ""}
          onClick={clickable ? getOnClick(to) : undefined}
        >
          {toPlaceName}{" "}
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
  const placeName = isSinglePointGeometry(location)
    ? location.coordinates.join(",")
    : location.place_name

  return (
    <LocationWrapper>
      <LocationTagHtml
        className={clickable ? "cursor-pointer" : ""}
        bgColor="#dedcd6"
        onClick={clickable ? getOnClick(location) : undefined}
      >
        {placeName}{" "}
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
