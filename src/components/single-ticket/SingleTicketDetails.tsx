import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"
import { Tag } from "../Tag"
import { Tooltip } from "@chakra-ui/react"
import React from "react"
import { useTranslations } from "../../hooks/translations"
import truncate from "truncate"
import { toast } from "react-toastify"
import { TicketDetailsType } from "../../services/ticket.type"
import { Ticket } from "../../services/ticket.class"

type SingleTicketDetailsProps = {
  ticket: TicketDetailsType
}

export const SingleTicketDetails = (props: SingleTicketDetailsProps) => {
  const { ticket } = props
  const translations = useTranslations()

  const need = new Ticket(ticket)

  const dateFormatted = new Date(ticket.date_created).toLocaleString("pl-PL")

  let ticketUrl
  if (typeof window !== "undefined") {
    ticketUrl = window.location.href
  }

  const copyToClipboardMessage = `${ticketUrl} ${truncate(
    ticket.description,
    100
  )} ${translations["pages"]["ticket"]["shareButton"]["deliverTo"]} ${
    ticket.where
  }`

  const showSuccessShareTicketToast = () => {
    toast.success(translations["pages"]["ticket"]["shareButton"]["copySuccess"])
  }

  const copyShareLinkButtonClicked = () =>
    navigator.clipboard.writeText(copyToClipboardMessage).then(() => {
      showSuccessShareTicketToast()
    })

  const ticketTags = need.tags

  if (need.notActive) return <></>

  return (
    <>
      <div className="border-t border-gray-200 bg-slate-50 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-600">
              {translations["pages"]["ticket"]["added"]}
            </dt>
            <dd className="mt-1 text-sm text-gray-600">{dateFormatted}</dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-600">
              {translations["pages"]["ticket"]["share"]}
            </dt>
            <div className="mt-1 text-sm text-gray-600 flex space-x-1">
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

              <span
                className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={copyShareLinkButtonClicked}
              >
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
            </div>
          </div>
        </dl>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2">
          {ticket.adults > 0 || ticket.children > 0 || !!ticket.has_pets ? (
            <>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {translations["pages"]["add-ticket"]["adults"]}
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
                  {translations["pages"]["add-ticket"]["children"]}
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
                  {translations["pages"]["add-ticket"]["has-pets"]}
                </dt>
                <dd
                  className="mt-1 text-lg text-gray-900"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {ticket.has_pets
                    ? translations["generic"]["yes"]
                    : translations["generic"]["no"]}
                </dd>
              </div>
            </>
          ) : null}

          <div className="col-span-3">
            <dt className="text-sm font-medium text-gray-500">
              {translations["pages"]["ticket"]["whatsNeeded"]}
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
                {translations["pages"]["ticket"]["helpType"]}
              </dt>
              <dd className="mt-1 text-lg text-gray-900 flex">
                {ticketTags.map((tag) => {
                  return <Tag tag={tag.need_tag_id} key={tag.need_tag_id.id} />
                })}
              </dd>
            </div>
          )}

          {ticket.where && (
            <div className="col-span-3">
              <dt className="text-sm font-medium text-gray-500">
                {translations["pages"]["ticket"]["whereToDeliver"]}
              </dt>
              <dd className="mt-1 text-lg text-gray-900">{ticket.where}</dd>
            </div>
          )}

          {ticket.count && ticket.count > 0 ? (
            <div className="col-span-3">
              <dt className="text-sm font-medium text-gray-500">
                {translations["pages"]["ticket"]["howMuchIsNeeded"]}
              </dt>
              <dd className="mt-1 text-lg text-gray-900">{ticket.count}</dd>
            </div>
          ) : null}

          {ticket.who && (
            <div className="col-span-3">
              <dt className="text-sm font-medium text-gray-500">
                {translations["pages"]["ticket"]["whoRequestedNeed"]}
              </dt>
              <dd className="mt-1 text-lg text-gray-900">
                {ticket.organization_id ? (
                  <span className="flex items-center space-x-1">
                    <Tooltip
                      label={
                        translations["pages"]["ticket"]["verifiedOrganisation"]
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
  )
}
