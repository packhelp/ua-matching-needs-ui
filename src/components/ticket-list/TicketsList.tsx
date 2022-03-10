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
import { TicketsListSingleTicket } from "./TicketsListSingleTicket"

export const TRANSPORT_TAG = 5

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
  const [whereToTag, setWhereToTag] = useState(
    parseInt((router.query["where_to"] as string) || "0")
  )
  const [whereFromTag, setWhereFromTag] = useState(
    parseInt((router.query["where_from"] as string) || "0")
  )
  const [queryKey] = useState("tickets")

  const nextClient = new NextApiClient()

  const { data: ticketsData, isLoading } = useQuery(
    [queryKey, whereFromTag, whereToTag, selectedTag, selectedPage],
    () => {
      return nextClient.getTicket({
        mineOnly: mineOnly,
        ticketStatus: ticketStatus,
        tagId: selectedTag,
        page: selectedPage,
        whereFromTagId: whereFromTag,
        whereToTagId: whereToTag,
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
    setWhereToTag(parseInt((router.query["where_to"] as string) || "0"))
  }, [router.query["where_to"]])

  useEffect(() => {
    setWhereFromTag(parseInt((router.query["where_from"] as string) || "0"))
  }, [router.query["where_from"]])

  useEffect(() => {
    queryClient.invalidateQueries([
      queryKey,
      whereFromTag,
      whereToTag,
      selectedTag,
      selectedPage,
    ])
  }, [
    selectedTag,
    selectedPage,
    whereToTag,
    whereFromTag,
    queryKey,
    queryClient,
  ])

  return (
    <>
      <TicketsListMetaData tag={currentTag} ticketsListTitle={title} />
      <TicketsListHeader title={title} count={ticketsData?.meta.filter_count} />

      <div className="py-2 mx-auto max-w-7xl sm:px-6 xl:px-0">
        <TicketsListFilters
          tags={tags}
          locationTags={locationTags}
          selectedTag={selectedTag}
          whereFromTag={whereFromTag}
          whereToTag={whereToTag}
        />

        {isLoading ? (
          <Center h="100px" color="yellow.400">
            <Spinner size="xl" thickness="6px" />
          </Center>
        ) : (
          <ul
            role="list"
            className="my-4 grid align-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {ticketsData.tickets.map((ticket) => (
              <TicketsListSingleTicket key={ticket.id} ticket={ticket} />
            ))}
          </ul>
        )}

        <Pagination ticketsData={ticketsData} selectedPage={selectedPage} />
      </div>
    </>
  )
}
