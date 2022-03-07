import React, { useState, VFC } from "react"
import { TicketDetailsType } from "../../services/ticket.type"
import { Modal } from "../Modal"
import { useTranslations } from "../../hooks/translations"
import { useMutation } from "react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Textarea } from "@chakra-ui/react"
import Select, { SingleValue } from "react-select"

type ReportPostData = {
  reason: string
  description: string
}

export const ReportTicket: VFC<{
  ticket: TicketDetailsType
}> = ({ ticket }) => {
  const [reportTicketModalOpened, setReportTicketModalOpened] =
    useState<boolean>(false)

  const translations = useTranslations()
  const [reason, setReason] = useState<string>("")

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
      reason,
      ...data,
      status: "published",
      need: ticket.id,
    })
  }

  const reportReasonsKeys = Object.keys(
    translations["report"]["reason"]["options"]
  )
  const reportReasons = reportReasonsKeys.map((reasonKey) => ({
    value: reasonKey,
    label: translations["report"]["reason"]["options"][reasonKey],
  }))

  const isDisabled = reason === ""

  const sendStaleReport = () => {
    submitReport({ reason: "stale" })
    setReportTicketModalOpened(true)
  }

  const cleanupAfterClosingModal = () => {
    setReportTicketModalOpened(false)
    setReason("")
    addTicketMutation.reset()
  }

  return (
    <>
      <ReportTicketButtons
        onClick={() => setReportTicketModalOpened(true)}
        onStaleClick={sendStaleReport}
      />

      {reportTicketModalOpened && (
        <Modal
          title={
            addTicketMutation.isSuccess
              ? translations["report"]["thankYou"]
              : translations["report"]["title"]
          }
          content={
            <>
              {addTicketMutation.isSuccess ? (
                <p>{translations["report"]["thankYouForReport"]}</p>
              ) : (
                <form>
                  <div className="text-left">
                    <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {translations["report"]["reason"]["chooseReason"]}
                    </h4>
                    <Select
                      options={reportReasons}
                      placeholder={
                        translations["report"]["reason"]["chooseReason"]
                      }
                      onChange={(
                        newValue: SingleValue<{ value: string; label: string }>
                      ) => {
                        setReason(newValue ? newValue.value : "")
                      }}
                      isClearable
                      isSearchable={false}
                    />
                    {reason === "other" && (
                      <div className="mt-4 ">
                        <h4 className="mb-4 text-md font-semibold text-gray-900 lg:text-2xl dark:text-white">
                          {translations["report"]["reason"]["other"]}
                        </h4>
                        <Textarea
                          placeholder={translations["report"]["reasonDetails"]}
                          {...register("description")}
                        />
                      </div>
                    )}
                  </div>
                </form>
              )}
            </>
          }
          actions={
            !addTicketMutation.isSuccess && (
              <button
                onClick={handleSubmit(submitReport)}
                type="submit"
                disabled={isDisabled}
                className={`${
                  isDisabled ? "bg-gray-300" : "bg-red-600 hover:bg-red-800"
                } text-white focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600`}
              >
                {translations["report"]["actionReport"]}
              </button>
            )
          }
          onClose={cleanupAfterClosingModal}
        />
      )}
    </>
  )
}

type ReportTicketButton = {
  onClick: () => void
  onStaleClick: () => void
}

const ReportTicketButtons: VFC<ReportTicketButton> = ({
  onClick,
  onStaleClick,
}) => {
  const translations = useTranslations()

  return (
    <div className={"flex justify-around text-lg py-4"}>
      <BasicReportButton onClick={onClick}>
        {translations["report"]["reportErrors"]}
      </BasicReportButton>
      <StaleTicketReportButton onClick={onStaleClick}>
        {translations["report"]["reportStale"]}
      </StaleTicketReportButton>
    </div>
  )
}

const BasicReportButton = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: JSX.Element | string
}): JSX.Element => {
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
      {children}
    </div>
  )
}

const StaleTicketReportButton = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: JSX.Element | string
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
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6" />
        </g>
      </svg>
      {children}
    </div>
  )
}
