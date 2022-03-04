import { Text, Stack, Tag, Link, Tooltip } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import truncate from "truncate"
import { TICKET_STATUS, TicketDetails } from "../tickets/add"
import NextError from "next/error"
import { toast } from "react-toastify"
import "dayjs/locale/pl"
import "dayjs/plugin/relativeTime"
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"

import { useMutation } from "react-query"
import axios from "axios"
import { RouteDefinitions } from "../../src/utils/routes"
import Head from "next/head"
import React, { useEffect, useMemo } from "react"
import { metaData } from "../../src/utils/meta-data"
import { translations } from "../../src/utils/translations"
import { useFinalLocale } from "../../src/hooks/final-locale"
import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import { CopyToClipboard } from "react-copy-to-clipboard"

const LOCAL_STORAGE_KEY_VISITS_COUNTER = "visits-counter"
const TICKET_MARKED_AS_VISITED = "visited"

const getTicketDataFromEndpoint = async (
  id: number
): Promise<TicketDetails | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${id}?fields=*.*.*`

  try {
    const response = await axios.get(url)
    const { data } = response.data
    return data
  } catch (e: any) {
    // it's a Directus' bug
    // https://github.com/directus/directus/blob/962af79dbcd773e4c00c2c6cd0b89a14155320b5/api/src/services/items.ts#L322
    if (e.response.status === 403) {
      return null
    }
    throw new Error(e.message)
  }
}

export const isTicketActive = (ticket: TicketDetails): boolean => {
  return ticket.ticket_status === TICKET_STATUS.ACTIVE
}

export const Tags = ({ tags }: { tags: TicketDetails["need_tag_id"] }) => {
  if (!tags) return <></>

  return (
    <Stack mb={2}>
      <Text color={"grey.200"} fontSize={"sm"}>
        Rodzaj pomocy?
      </Text>
      {tags.map((tag) => {
        return (
          tag.need_tag_id &&
          tag.need_tag_id.name && (
            <div>
              <Tag colorScheme="yellow" variant="solid" borderRadius="full">
                <Text fontWeight="600" size="lg">
                  {tag.need_tag_id.name}
                </Text>
              </Tag>
            </div>
          )
        )
      })}
    </Stack>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const ticket = await getTicketDataFromEndpoint(Number(id))

  return { props: { ticket } }
}

const getLocalStorageVisitsCounterKey = (ticketId: number): string => {
  return `${LOCAL_STORAGE_KEY_VISITS_COUNTER}-${ticketId}`
}

const shouldCountVisit = (ticketId: number): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem(getLocalStorageVisitsCounterKey(ticketId)) !==
      TICKET_MARKED_AS_VISITED
    )
  }

  return false
}

const blockVisitsCounterFor = (ticketId: number): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      getLocalStorageVisitsCounterKey(ticketId),
      TICKET_MARKED_AS_VISITED
    )
  }
}

const countVisitOnce = (ticketId: number) => {
  if (shouldCountVisit(ticketId)) {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${ticketId}`
        )
        .then((response) => {
          const newVisits = response.data.data.visits + 1

          axios
            .patch(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need/${ticketId}`,
              {
                visits: newVisits,
              }
            )
            .then(() => {
              console.debug("Incremented visits counter")
              blockVisitsCounterFor(ticketId)
            })
        })
    } catch (e: any) {
      console.debug("The visits counter hasn't been updated ")
    }
  }
}

const TicketDetails: NextPage<{ ticket: TicketDetails }> = ({ ticket }) => {
  const { data: authSession } = useSession()
  const router = useRouter()
  const finalLocale = useFinalLocale()

  const { id } = router.query

  useEffect(() => {
    if (id) {
      void countVisitOnce(Number(id))
    }
  }, [id])

  const metaTitle = useMemo(() => {
    if (!ticket) {
      return metaData.title
    }

    const i18n = translations[finalLocale]["pages"]["ticket"]["metaTitle"]
    const tagList = ticket.need_tag_id || []
    const tag = tagList[0]?.need_tag_id?.name || ""
    const where = ticket.where || ""

    if (!tag && !where) {
      return metaData.title
    }

    const spacer = tag && where ? " - " : ""
    const title = `${i18n["need"]}: ${tag}${spacer}${where} | ${i18n["cta"]}`

    return title
  }, [ticket, finalLocale])

  const metaDescription = useMemo(() => {
    if (!ticket) {
      return metaData.description
    }

    return truncate(
      ticket.description || ticket.what || metaData.description,
      100
    )
  }, [ticket])

  const removeTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.post(`/api/remove-ticket`, { id: id })
    },
    {
      onSuccess: () => {
        toast.success("Ogłoszenie usunięte. Mozesz dodać kolejne.")
        return router.push(RouteDefinitions.AddTicket)
      },
    }
  )

  const markSolvedTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.patch(`/api/set-ticket-to-solved`, {
        id: id,
      })
    },
    {
      onSuccess: () => {
        toast.success(
          "Ogłoszenie zostało oznaczone jako rozwiąne! Mozesz dodać kolejne."
        )
        return router.push(RouteDefinitions.AddTicket)
      },
    }
  )

  if (!ticket) {
    return (
      <NextError statusCode={404}>
        Zgłoszenia nie znaleziono lub jest juz nieaktualne. Ale pewnie się coś
        znajdzie <Link href={RouteDefinitions.AllActiveTickets}>tutaj</Link>
      </NextError>
    )
  }

  const isOwner = authSession?.phoneNumber === ticket.phone

  const dateFormatted = new Date(ticket.date_created).toLocaleString("pl-PL")

  const removeTicket = () => {
    if (id) {
      removeTicketMutation.mutate(Number(id))
    } else {
      toast.error("Wystąpił błąd z usuwaniem zgłoszenia")
    }
  }

  const showSuccessShareTicketToast = (_, copied) => {
    if (!copied) return

    toast.success(
      translations[finalLocale]["pages"]["ticket"]["shareButton"]["copySuccess"]
    )
  }

  const markAsSolvedTicket = () => {
    if (id) {
      markSolvedTicketMutation.mutate(Number(id))
    } else {
      toast.error("Wystąpił błąd z oznaczeniem zgłoszenia jako rozwiąane")
    }
  }

  const formattedExpiration = dayjs(ticket.expirationTimestampSane)
    .locale("pl")
    .format("DD.MM.YYYY HH:mm")
    .toString()

  let ticketUrl
  if (typeof window !== "undefined") {
    ticketUrl = window.location.href
  }
  const ticketTags = TicketDetails["need_tag_id"]

  let title = ticket.what ? ticket.what : ticket.description

  const copyToClipboardMessage = `${ticketUrl} ${truncate(
    ticket.description,
    100
  )} ${
    translations[finalLocale]["pages"]["ticket"]["shareButton"]["deliverTo"]
  } ${ticket.where}`

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} key="og-title" />
        <meta
          property="description"
          content={metaDescription}
          key="description"
        />
        <meta
          property="og:description"
          content={metaDescription}
          key="og-description"
        />
      </Head>

      <section aria-labelledby="applicant-information-title">
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-3">
              <p className="mb-1 max-w-2xl text-sm text-gray-500 flex items-center space-x-3">
                <span className="font-medium">Nr Zgłoszenia: #{ticket.id}</span>

                {ticket.organization_id && (
                  <span className="flex space-x-1 font-medium text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Zweryfikowana organizacja</span>
                  </span>
                )}
              </p>
              <h2
                id="applicant-information-title"
                className="text-3xl leading-9 font-medium text-gray-900 truncate"
              >
                {title}
              </h2>

              {!isTicketActive(ticket) && (
                <div className="rounded-md mt-4 bg-red-200 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 uppercase">
                        UWAGA: Zgłoszenie nieaktualne!
                      </h3>

                      <div className="mt-2 text-sm text-red-700">
                        <ul role="list" className="list-disc pl-5 space-y-1">
                          <li>
                            Ogłoszenie wygasa po czasie ustalonym przez osobę
                            zgłaszającą
                          </li>
                          <li>
                            Osoba zgłąszająca w każdym momencie może
                            wygasić ogłoszenie
                          </li>
                          <li>
                            Poszukaj innego zgłoszenia - dziękujemy za pomoc!
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </dl>
        </div>

        {isTicketActive(ticket) && (
          <>
            <div className="border-t border-gray-200 bg-slate-50 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-600">Dodano</dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    {dateFormatted}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-600">
                    Udostępnij
                  </dt>
                  <div className="mt-1 text-sm text-gray-600 flex space-x-1">
                    {/* Twitter */}
                    <TwitterShareButton url={ticketUrl}>
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--logos w-7 h-7"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 256 209"
                        >
                          <path
                            fill="#55acee"
                            d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435c0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
                          ></path>
                        </svg>
                      </span>
                    </TwitterShareButton>

                    {/* Telegram */}
                    <TelegramShareButton url={ticketUrl}>
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--logos w-7 h-7"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="#40B3E0"
                            d="M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128s128-57.307 128-128S198.693 0 128 0Z"
                          ></path>
                          <path
                            fill="#FFF"
                            d="M190.283 73.63L167.42 188.899s-3.197 7.994-11.99 4.157l-52.758-40.448l-19.184-9.272l-32.294-10.872s-4.956-1.758-5.436-5.595c-.48-3.837 5.596-5.915 5.596-5.915l128.376-50.36s10.552-4.636 10.552 3.038"
                          ></path>
                          <path
                            fill="#D2E5F1"
                            d="M98.618 187.603s-1.54-.144-3.46-6.22c-1.917-6.075-11.67-38.049-11.67-38.049l77.538-49.24s4.477-2.718 4.317 0c0 0 .799.48-1.6 2.718c-2.397 2.239-60.91 54.836-60.91 54.836"
                          ></path>
                          <path
                            fill="#B5CFE4"
                            d="m122.901 168.115l-20.867 19.026s-1.632 1.238-3.416.462l3.996-35.34"
                          ></path>
                        </svg>
                      </span>
                    </TelegramShareButton>

                    {/* Facebook */}
                    <FacebookShareButton url={ticketUrl}>
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--logos w-7 h-7"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="#395185"
                            d="M241.871 256.001c7.802 0 14.129-6.326 14.129-14.129V14.129C256 6.325 249.673 0 241.871 0H14.129C6.324 0 0 6.325 0 14.129v227.743c0 7.803 6.324 14.129 14.129 14.129h227.742"
                          ></path>
                          <path
                            fill="#FFF"
                            d="M176.635 256.001v-99.137h33.277l4.982-38.635h-38.259V93.561c0-11.186 3.107-18.809 19.148-18.809l20.459-.009V40.188c-3.54-.471-15.684-1.523-29.812-1.523c-29.498 0-49.692 18.005-49.692 51.071v28.493h-33.362v38.635h33.362v99.137h39.897"
                          ></path>
                        </svg>
                      </span>
                    </FacebookShareButton>

                    {/* COPY URL */}
                    <CopyToClipboard
                      text={copyToClipboardMessage}
                      onCopy={showSuccessShareTicketToast}
                    >
                      <span className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--logos w-7 h-7"
                          width="32"
                          height="32"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="#888888"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5"></path>
                            <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5"></path>
                          </g>
                        </svg>
                      </span>
                    </CopyToClipboard>
                    {/* COPY URL */}
                  </div>
                </div>
              </dl>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
                {ticket.adults > 0 ||
                ticket.children > 0 ||
                !!ticket.has_pets ? (
                  <>
                    <div className="col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {
                          translations[finalLocale]["pages"]["add-ticket"][
                            "adults"
                          ]
                        }
                      </dt>
                      <dd
                        className="mt-1 text-lg text-gray-900"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {ticket.adults}
                      </dd>
                    </div>
                    <div className="col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {
                          translations[finalLocale]["pages"]["add-ticket"][
                            "children"
                          ]
                        }
                      </dt>
                      <dd
                        className="mt-1 text-lg text-gray-900"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {ticket.children}
                      </dd>
                    </div>
                    <div className="col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {
                          translations[finalLocale]["pages"]["add-ticket"][
                            "has-pets"
                          ]
                        }
                      </dt>
                      <dd
                        className="mt-1 text-lg text-gray-900"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {ticket.has_pets ? "tak" : "nie"}
                      </dd>
                    </div>
                  </>
                ) : null}

                <div className="col-span-3">
                  <dt className="text-sm font-medium text-gray-500">
                    Co potrzeba?
                  </dt>
                  <dd
                    className="mt-1 text-lg text-gray-900"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {ticket.description}
                  </dd>
                </div>

                {ticketTags && (
                  <div className="col-span-3">
                    <dt className="text-sm font-medium text-gray-500">
                      Rodzaj pomocy
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {ticketTags.map((tag) => {
                        return (
                          tag.need_tag_id &&
                          tag.need_tag_id.name && (
                            <div>
                              <Tag
                                colorScheme="yellow"
                                variant="solid"
                                borderRadius="full"
                              >
                                <Text fontWeight="600" size="lg">
                                  {tag.need_tag_id.name}
                                </Text>
                              </Tag>
                            </div>
                          )
                        )
                      })}
                    </dd>
                  </div>
                )}

                {ticket.where && (
                  <div className="col-span-3">
                    <dt className="text-sm font-medium text-gray-500">
                      Gdzie dostarczyć?
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {ticket.where}
                    </dd>
                  </div>
                )}

                {ticket.count && ticket.count > 0 ? (
                  <div className="col-span-3">
                    <dt className="text-sm font-medium text-gray-500">
                      Ile potrzeba?
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {ticket.count}
                    </dd>
                  </div>
                ) : null}

                {ticket.who && (
                  <div className="col-span-3">
                    <dt className="text-sm font-medium text-gray-500">
                      Kto zgłosił zapotrzebowanie?
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {ticket.organization_id ? (
                        <span className="flex items-center space-x-1">
                          <Tooltip label="Zweryfikowana organizacja">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-blue-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Tooltip>
                          <span>{ticket.who}</span>
                        </span>
                      ) : (
                        <span>{ticket.who}</span>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}

        <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
          {isTicketActive(ticket) && (
            <>
              {ticket.phone_public && (
                <a
                  href={`tel:${ticket.phone}`}
                  className="inline-flex items-center w-full place-content-center
                rounded-md py-4 border border-transparent shadow-sm text-xl
                font-medium text-white bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                text-white"
                >
                  Zadzwoń {ticket.phone}
                  <svg
                    className="ml-3 -mr-1 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              )}

              {isOwner && (
                <div className="px-2 py-2 text-center">
                  <span className="text-sm mr-2 text-gray-500 font-medium">
                    Jesteś autorem tego zgłoszenia?
                  </span>
                  <div className="flex space-x-1 items-center justify-center">
                    <button
                      onClick={markAsSolvedTicket}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Problem rozwiązany!
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={removeTicket}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Usuń
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {isTicketActive(ticket) ? (
            <p className="my-4 max-w-2xl text-center text-sm text-gray-500">
              Zgłoszenie aktywne do: {formattedExpiration}
            </p>
          ) : (
            <p className="my-4 max-w-2xl text-center text-sm font-medium text-red-600">
              Zgłoszenie wygasło: {formattedExpiration}
            </p>
          )}

          <p className="my-4 max-w-2xl text-center text-sm text-gray-500">
            Odsłon: {ticket.visits + 1}
          </p>
        </div>
      </section>
    </div>
  )
}

export default TicketDetails
