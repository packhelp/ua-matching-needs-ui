import { Center, Spinner } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import {
  LocationTag,
  NeedTagType,
  TICKET_STATUS,
} from "../../services/ticket.type"
import { getRootContainer } from "../../services/_root-container"
import { TicketsListMetaData } from "./TicketsListMetaData"
import { Pagination } from "./Pagination"
import { TicketsListHeader } from "./TicketsListHeader"
import { TicketsListFilters } from "./TicketsListFilters"
import { TicketsList } from "./TicketsList"
import { NextApiClient } from "../../services/directus-signed-user-api"
import { TagConstIds } from "../../services/types.tag"
const ts = getRootContainer().containers.ticketService

export const Tickets = ({
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

  const {
    data: ticketsData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(
    queryKey,
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
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )

  const queryClient = useQueryClient()

  useEffect(() => {
    const tag = parseInt((router.query.tag as string) || "0")
    if (
      tag !== TagConstIds.transport &&
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
    queryClient.cancelQueries(queryKey)
    void refetch()
  }, [
    selectedTag,
    selectedPage,
    whereToTag,
    whereFromTag,
    queryKey,
    refetch,
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

        {isLoading || isRefetching ? (
          <Center h="100px" color="yellow.400">
            <Spinner size="xl" thickness="6px" />
          </Center>
        ) : (
          <TicketsList tickets={ticketsData.tickets} />
        )}

        <Pagination ticketsData={ticketsData} selectedPage={selectedPage} />
      </div>
    </>
  )
}
