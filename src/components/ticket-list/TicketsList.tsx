/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import {
  LocationTag,
  NeedTagType,
  TICKET_STATUS,
} from "../../services/ticket.type"
import { TicketsListMetaData } from "./TicketsListMetaData"
import { Pagination } from "./Pagination"
import { TicketsListHeader } from "./TicketsListHeader"
import { TicketsListFilters } from "./TicketsListFilters"
import { NextApiClient } from "../../services/directus-signed-user-api"
import { TicketsListSingleTicket } from "./single-ticket"
import { TagConstIds } from "../../services/types.tag"
import { TicketsMap } from "../map/TicketsMap"
import { Ticket } from "../../services/ticket.class"
import { FiMap } from "react-icons/fi"

export const TRANSPORT_TAG = TagConstIds.transport

export const TicketsList = ({
  mineOnly,
  ticketStatus,
  title,
  tags,
  locationTags,
  currentTag,
}: {
  mineOnly?: boolean
  ticketStatus: TICKET_STATUS
  title: string
  tags: NeedTagType[]
  locationTags: LocationTag[]
  currentTag?: NeedTagType
}) => {
  const router = useRouter()

  const [selectedTag, setSelectedTag] = useState(
    parseInt((router.query.tag as string) || "0")
  )
  const [selectedPage, setSelectedPage] = useState(
    parseInt(router.query.page as string) || 1
  )

  const [isMapEnabled, setMapEnabled] = useState<boolean>(false)

  const [queryKey] = useState("tickets")

  const nextClient = new NextApiClient()

  const { data: ticketsData, isLoading } = useQuery(
    [queryKey, selectedTag, selectedPage],
    () => {
      return nextClient.getTicket({
        mineOnly: mineOnly,
        ticketStatus: ticketStatus,
        tagId: selectedTag,
        page: selectedPage,
      })
    },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )

  const queryClient = useQueryClient()

  useEffect(() => {
    const tag = parseInt((router.query.tag as string) || "0")
    if (
      tag !== TRANSPORT_TAG &&
      (router.query.where_to || router.query.where_from)
    ) {
      delete router.query.where_to
      delete router.query.where_from
      router.push(router)
    }
    setSelectedTag(parseInt((router.query.tag as string) || "0"))
  }, [router.query.tag])

  useEffect(() => {
    setSelectedPage(parseInt(router.query.page as string) || 1)
  }, [router.query.page])

  useEffect(() => {
    queryClient.invalidateQueries([queryKey, selectedTag, selectedPage])
  }, [selectedTag, selectedPage, queryKey, queryClient])

  const toggleMap = () => {
    setMapEnabled(!isMapEnabled)
  }

  return (
    <>
      <TicketsListMetaData tag={currentTag} ticketsListTitle={title} />
      <TicketsListHeader title={title} count={ticketsData?.meta.filter_count} />

      <div className="py-2 mx-auto max-w-7xl sm:px-6 xl:px-0">
        <TicketsListFilters
          tags={tags}
          locationTags={locationTags}
          selectedTag={selectedTag}
        />

        {isLoading ? (
          <Center h="100px" color="yellow.400">
            <Spinner size="xl" thickness="6px" />
          </Center>
        ) : (
          <div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
              <ul
                role="list"
                className={`my-4 align-center gap-4 flex flex-col ${
                  isMapEnabled ? "hidden md:block" : "block"
                }`}
              >
                {ticketsData.tickets.map((ticket) => (
                  <TicketsListSingleTicket key={ticket.id} ticket={ticket} />
                ))}
              </ul>
              <div
                className={`relative md:fixed w-full md:w-1/2 ${
                  isMapEnabled ? "block" : "hidden md:block"
                }`}
                style={{
                  height: "calc(100vh - 220px)",
                  bottom: 0,
                  right: 0,
                }}
              >
                <TicketsMap
                  tickets={ticketsData.tickets.map(
                    (ticket) => new Ticket(ticket)
                  )}
                />
              </div>
            </div>
            <MapToggler toggleMap={toggleMap} isMapEnabled={isMapEnabled} />
          </div>
        )}

        <Pagination ticketsData={ticketsData} selectedPage={selectedPage} />
      </div>
    </>
  )
}

const MapToggler = ({
  toggleMap,
  isMapEnabled,
}: {
  toggleMap: () => void
  isMapEnabled: boolean
}) => {
  return (
    <div
      className={"fixed w-full px-4 text-center"}
      style={{
        zIndex: 999999,
        bottom: "2rem",
        left: 0,
      }}
    >
      <div
        className={
          "cursor-pointer rounded-full text-3xl inline-flex gap-2 outline bg-white w-auto text-center items-center justify-center px-6 py-2 block md:hidden w-auto m-auto"
        }
        onClick={toggleMap}
      >
        {isMapEnabled ? (
          <>
            <FiMap />
            <span>List</span>
          </>
        ) : (
          <>
            <FiMap />
            <span>Map</span>
          </>
        )}
      </div>
    </div>
  )
}
