import React, { useState, VoidFunctionComponent } from "react"
import { isTicketActive } from "../../../pages/ticket/[id]"
import dayjs from "dayjs"
import { useTranslations } from "../../hooks/translations"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import NextError from "next/error"
import axios from "axios"
import { RouteDefinitions } from "../../utils/routes"
import { TicketDetailsType, TicketPostData } from "../../services/ticket.type"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { Button, Stack, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import Select, { SingleValue } from "react-select"

type SingleTicketFooterProps = {
  ticket: TicketDetailsType
}

export const SingleTicketFooter = (props: SingleTicketFooterProps) => {
  const { ticket } = props
  const { data: authSession } = useSession()
  const router = useRouter()
  const translations = useTranslations()

  const { id } = router.query

  const removeTicketMutation = useMutation<number, NextError, number>(
    (id: number) => {
      return axios.post(`/api/remove-ticket`, { id: id })
    },
    {
      onSuccess: () => {
        toast.success(translations["pages"]["ticket"]["ticketRemovedAddNew"])
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
        toast.success(translations["pages"]["ticket"]["ticketSolvedAddNew"])
        return router.push(RouteDefinitions.AddTicket)
      },
    }
  )

  const markAsSolvedTicket = () => {
    if (id) {
      markSolvedTicketMutation.mutate(Number(id))
    } else {
      toast.error(translations["pages"]["ticket"]["errorOnRemove"])
    }
  }

  const removeTicket = () => {
    if (id) {
      removeTicketMutation.mutate(Number(id))
    } else {
      toast.error(translations["pages"]["ticket"]["errorOnRemove"])
    }
  }

  const formattedExpiration = dayjs(ticket.expirationTimestampSane)
    .locale("pl")
    .format("DD.MM.YYYY HH:mm")
    .toString()

  const isOwner = authSession?.phoneNumber === ticket.phone
  const isActive = isTicketActive(ticket)

  return (
    <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
      {isActive && (
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
              {translations["pages"]["ticket"]["call"]} {ticket.phone}
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
                {translations["pages"]["ticket"]["areYouTheAuthorOfThisTicket"]}
              </span>
              <div className="flex space-x-1 items-center justify-center">
                <button
                  onClick={markAsSolvedTicket}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {translations["pages"]["ticket"]["problemSolved"]}
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
                  {translations["pages"]["ticket"]["remove"]}
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

      {isActive ? (
        <p className="my-4 max-w-2xl text-center text-sm text-gray-500">
          {translations["pages"]["ticket"]["needActiveTill"]}{" "}
          {formattedExpiration}
        </p>
      ) : (
        <p className="my-4 max-w-2xl text-center text-sm font-medium text-red-600">
          {translations["pages"]["ticket"]["needExpired"]} {formattedExpiration}
        </p>
      )}

      <ReportTicket ticket={props.ticket} />
    </div>
  )
}

const ReportTicket: VoidFunctionComponent<{ ticket: TicketDetailsType }> = ({
  ticket,
}) => {
  const [isOpen, setOpened] = useState<boolean>(false)

  return (
    <>
      <ReportTicketButton onClick={() => setOpened(!isOpen)} />
      <ReportTicketModal
        isOpen={isOpen}
        onClose={() => setOpened(false)}
        ticketId={ticket.id}
      />
    </>
  )
}

type ReportTicketButton = {
  onClick: () => void
}

const ReportTicketButton: VoidFunctionComponent<ReportTicketButton> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={"inline-flex gap-1 cursor-pointer align-middle items-center"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1.75 1.5a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.75.75 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.457 1.457 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25v-9.5zM9 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-.25-5.25a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5z"
        />
      </svg>{" "}
      Zgłoś nieprawidłowości
    </div>
  )
}

type ReportPostData = {
  reason: string
  description: string
}

type ReportTicketModalProps = {
  isOpen: boolean
  onClose: () => void
  ticketId: number
}

const ReportTicketModal: VoidFunctionComponent<ReportTicketModalProps> = ({
  isOpen,
  onClose,
  ticketId,
}) => {
  const translations = useTranslations()
  const [reason, setReason] = useState<string>("other")

  const addTicketMutation = useMutation<ReportPostData, Error, ReportPostData>(
    (reportData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need_report`,
        reportData
      )
    }
  )

  const { handleSubmit, register } = useForm()

  const submitReport = (data) => {
    addTicketMutation.mutate({
      ...data,
      reason,
      status: "published",
      need: ticketId,
    })
  }

  const reportReasonsKeys = Object.keys(translations["report"]["reason"])
  const reportReasons = reportReasonsKeys.map((reasonKey) => ({
    value: reasonKey,
    label: translations["report"]["reason"][reasonKey],
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Zgłoś nieprawidłowości</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {addTicketMutation.isSuccess && (
            <p>{translations["report"]["thankYouForReport"]}</p>
          )}

          <form onSubmit={handleSubmit(submitReport)}>
            <Stack>
              <Select
                options={reportReasons}
                placeholder={translations["report"]["chooseReason"]}
                isClearable
                isSearchable={false}
                onChange={(
                  newValue: SingleValue<{ value: string; label: string }>
                ) => {
                  setReason(newValue ? newValue.value : "")
                }}
              />
            </Stack>
            <Stack className={"mb-2"}>
              <p>{translations["report"]["reasonDetails"]}</p>
              <Textarea {...register("description")} />
            </Stack>

            <div className={"flex justify-between"}>
              <button onClick={onClose}>
                {translations["generic"]["close"]}
              </button>
              <Button
                colorScheme="blue"
                mr={3}
                type={"submit"}
                disabled={addTicketMutation.isLoading}
              >
                {translations["report"]["actionReport"]}
              </Button>
            </div>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
