import { Center, Spinner, Tooltip } from "@chakra-ui/react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useTranslations } from "../hooks/translations"
import { RouteDefinitions } from "../utils/routes"
import {
  LocationTag,
  NeedTagType,
  TICKET_STATUS,
} from "../services/ticket.type"
import { Tag } from "./Tag"
import { FiltersBadges, FiltersDropdown } from "./Filters"
import { getRootContainer } from "../services/_root-container"
import ReactPaginate from "react-paginate"
import { TicketsListMetaData } from "./single-ticket/TicketsListMetaData"
const ts = getRootContainer().containers.ticketService

export const TRANSPORT_TAG = 5

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
  const translations = useTranslations()
  const { locale } = router
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

  const {
    data: ticketsData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(
    queryKey,
    () => {
      const url = `/api/get-tickets`

      return axios
        .get(url, {
          params: {
            mineOnly: mineOnly,
            ticketStatus: ticketStatus,
            tagId: selectedTag,
            page: selectedPage,
            whereFromTag: whereFromTag,
            whereToTag: whereToTag,
          },
        })
        .then((response) => {
          return response.data
        })
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )

  const queryClient = useQueryClient()

  const onTagClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.tag = tag.toString()
      } else {
        delete router.query.tag
      }

      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

  const onPageClick = useCallback(
    (page: number) => {
      router.query.page = page.toString()
      router.push(router)
    },
    [router]
  )

  const onWhereToClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.where_to = tag.toString()
      } else {
        delete router.query.where_to
      }
      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

  const onWhereFromClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.where_from = tag.toString()
      } else {
        delete router.query.where_from
      }
      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

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

  const isTransport = useMemo(
    () => selectedTag === TRANSPORT_TAG,
    [selectedTag]
  )

  return (
    <>
      <TicketsListMetaData tag={currentTag} ticketsListTitle={title} />
      <h1 className="my-4 text-3xl font-semibold text-center">
        {title}
        {ticketsData?.meta && (
          <span className="ml-2">({ticketsData.meta.filter_count})</span>
        )}
      </h1>
      <div className="py-2 mx-auto max-w-7xl sm:px-6 xl:px-0">
        <div className="block md:hidden">
          <FiltersDropdown
            data={tags}
            onSelectFilter={onTagClick}
            activeTag={selectedTag}
          />
        </div>

        <div className="text-center hidden md:block">
          <FiltersBadges
            data={tags}
            onSelectFilter={onTagClick}
            activeTag={selectedTag}
          />
        </div>

        {isTransport && (
          <div className="mx-auto md:max-w-xl md:mt-4">
            <div className="md:grid grid-cols-2 gap-4">
              <FiltersDropdown
                data={locationTags}
                onSelectFilter={onWhereFromClick}
                activeTag={whereFromTag}
                placeholder={translations["filters"]["whereFrom"]}
              />
              <FiltersDropdown
                data={locationTags}
                onSelectFilter={onWhereToClick}
                activeTag={whereToTag}
                placeholder={translations["filters"]["whereTo"]}
              />
            </div>
          </div>
        )}

        {isLoading || isRefetching ? (
          <Center h="100px" color="yellow.400">
            <Spinner size="xl" thickness="6px" />
          </Center>
        ) : (
          <ul
            role="list"
            className="my-4 grid align-center grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {ticketsData?.tickets &&
              ticketsData.tickets.map((ticket) => {
                const dateFormatted = new Date(
                  ticket.date_created
                ).toLocaleString("pl-PL")
                const ticketUrl = RouteDefinitions.TicketDetails.replace(
                  ":id",
                  ticket.id
                )

                return (
                  <li
                    key={ticket.id}
                    className={`bg-white rounded-lg shadow outline-blue-200  col-span-1 divide-y divide-gray-200 ticket-item ${
                      ticket.organization_id ? "verified" : ""
                    }`}
                  >
                    <Link href={ticketUrl} locale={locale}>
                      <div className="px-4 py-5 border-gray-200 sm:px-6 cursor-pointer">
                        <div className="mb-2">
                          <p className="flex items-center max-w-2xl mb-1 text-sm text-gray-400 space-x-1">
                            {ticket.organization_id ? (
                              <>
                                <Tooltip
                                  label={
                                    translations.pages.ticket
                                      .verifiedOrganisation
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-blue-400"
                                    viewBox="0 0 20 20"
                                    fill="#4989bb"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Tooltip>
                                <span className="ticket-item__number pr-1 text-blue-400 font-medium">
                                  #{ticket.id}
                                </span>
                              </>
                            ) : (
                              <span className="pr-1 my-1 font-medium">
                                #{ticket.id}
                              </span>
                            )}
                            <span className="">
                              {ticket.need_tag_id.map((tag) => {
                                if (
                                  !tag ||
                                  !tag.need_tag_id ||
                                  !tag.need_tag_id.id
                                ) {
                                  return null
                                }

                                return (
                                  <Tag
                                    key={tag.need_tag_id.id}
                                    tag={tag.need_tag_id}
                                  />
                                )
                              })}
                            </span>
                          </p>
                        </div>
                        <div className="py-1">
                          <p className="text-xl font-medium text-gray-900 truncate">
                            {ticket.what || ticket.description}
                          </p>
                          {ticket.where ? (
                            <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span>{ticket.where}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
                              <span className="w-5 h-5"></span>
                            </div>
                          )}
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-8">
                          <div className="sm:col-span-1">
                            <dt className="text-xs font-medium text-gray-400">
                              {translations["pages"]["ticket"]["whoRequested"]}
                            </dt>
                            <dd className="flex items-center text-sm text-gray-900 truncate">
                              {ticket.organization_id ? (
                                <span className="truncate">
                                  {ticket.organization_id.name}
                                </span>
                              ) : (
                                <span className="truncate">{ticket.who}</span>
                              )}
                            </dd>
                          </div>

                          <div className="sm:col-span-1">
                            <dt className="text-xs font-medium text-gray-400">
                              {translations["pages"]["ticket"]["added"]}
                            </dt>
                            <dd className="text-sm text-gray-900 ">
                              {dateFormatted}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </Link>
                    <div className="flex -mt-px divide-x divide-gray-200">
                      <div className="flex flex-1 w-0">
                        <Link href={ticketUrl} locale={locale}>
                          <a className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="ml-3">
                              {translations["pages"]["ticket"]["details"]}
                            </span>
                          </a>
                        </Link>
                      </div>

                      {ticket.phone_public && (
                        <div className="flex flex-1 w-0 -ml-px">
                          <a
                            href={`tel:${ticket.phone}`}
                            className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                          >
                            <svg
                              className="w-5 h-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="ml-3">{ticket.phone}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
          </ul>
        )}

        {ticketsData?.tickets.length > 0 && (
          <div className="flex justify-center mt-5">
            <ReactPaginate
              breakLabel="..."
              previousLabel={
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              nextLabel={
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              forcePage={selectedPage - 1}
              onPageChange={(page) => onPageClick(page.selected + 1)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={ticketsData.meta.page_count}
              containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              breakLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              nextLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            />
          </div>
        )}
      </div>
    </>
  )
}
