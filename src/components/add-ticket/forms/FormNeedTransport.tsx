import { Checkbox, Input, Textarea } from "@chakra-ui/react"
import { useTranslations } from "../../../hooks/translations"
import { useForm, Controller } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import React, { useState, useMemo } from "react"
import { PlusSVG } from "../../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"
import { getRootContainer } from "../../../services/_root-container"
import Select from "react-select"

import { RouteDefinitions } from "../../../utils/routes"
import { NeedTripPostData } from "../../../services/ticket.type"
import { TagConstIds } from "../../../services/types.tag"
import { FormField } from "../FormField"
import { ErrorMessage } from "@hookform/error-message"

export type TransportNeededVariant = "whereFrom" | "whereTo"
export type InputValuesType = {
  [key in TransportNeededVariant]: {
    value: number | undefined
    label: string | undefined
  }
}

const ticketService = getRootContainer().containers.ticketService

export const FormNeedTransport = () => {
  const router = useRouter()
  const translations = useTranslations()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exactDate, setExactDate] = useState(false)
  const { data: authSession, status: authStatus } = useSession()
  const { data: locationTags = [] } = useQuery(`location-tags`, () => {
    return ticketService.locationTags()
  })

  const mappedLocationTags = useMemo(() => {
    return locationTags
      .map((tag) => {
        let name = tag.name

        if (tag.location_type === "help_center" && tag.short_name != null) {
          name = tag.short_name
        }

        return {
          value: tag.id,
          label: name,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [locationTags])

  const onSuccess = (rawResponse) => {
    const { data } = rawResponse.data
    const id = data.id

    toast.success(translations["pages"]["add-ticket"]["need-added"])

    setTimeout(() => {
      return router.push(
        RouteDefinitions.TicketDetails.replace(":id", String(id))
      )
    }, 1000)
  }

  const addTicketMutation = useMutation<
    NeedTripPostData,
    Error,
    NeedTripPostData
  >(
    (newTicket) => {
      const {
        phone,
        who,
        what,
        description,
        adults,
        children,
        has_pets,
        trip_when_text,
        trip_when_date, // TODO:
        trip_extra_luggage,
        where_from_tag,
        where_to_tag,
      } = newTicket
      const expirationTimestampSane = dayjs().add(24, "hour").format()

      let when_date: string | undefined = undefined
      if (trip_when_date != null) {
        const date = new Date(trip_when_date)
        when_date = date.toISOString()
      }

      const newTicketData = {
        what,
        description,
        expirationTimestampSane,
        phone,
        who,
        count: 0,
        adults: adults ? adults : 0,
        children: children ? children : 0,
        has_pets: !has_pets ? "0" : "1",

        // This is trip, so hardcore a trip tag
        need_tag_id: [{ need_tag_id: { id: TagConstIds.transport } }],

        // tripe specific
        need_type: "trip",
        where_to_tag,
        where_from_tag,
        trip_when_text,
        trip_when_date: when_date,
        trip_extra_luggage,
      }

      return axios.post(`/api/add-ticket`, newTicketData)
    },
    {
      onSuccess,
    }
  )

  const useFormOptions = {}

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NeedTripPostData>(useFormOptions)

  const submitNeed = async (data: NeedTripPostData) => {
    setIsSubmitting(true)

    if (authStatus === "unauthenticated" || !authSession?.user) {
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    const postData: NeedTripPostData = {
      ...data,
      phone: authSession.phoneNumber,
      need_tag_id: [],
    }

    addTicketMutation.mutate(postData, {
      onError: () => setIsSubmitting(false),
    })
  }

  const isDisabled = addTicketMutation.isLoading || isSubmitting

  return (
    <>
      <div className="mb-8 bg-white">
        <form onSubmit={handleSubmit(submitNeed)}>
          <FormField title={translations["pages"]["add-ticket"]["whereFrom"]}>
            <Controller
              name="where_from_tag"
              control={control}
              rules={{
                required: translations["pages"]["add-ticket"]["required"],
              }}
              render={({ field }) => (
                <Select
                  options={mappedLocationTags}
                  onChange={(e) => field.onChange(e!.value)}
                  placeholder={
                    translations["pages"]["add-ticket"]["chooseLocation"]
                  }
                  isClearable
                  isSearchable={false}
                  ref={field.ref}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="where_from_tag"
              render={({ message }) => (
                <p className="text-red-500 text-xs mt-1">{message}</p>
              )}
            />
          </FormField>

          <FormField title={translations["pages"]["add-ticket"]["whereTo"]}>
            <Controller
              name="where_to_tag"
              control={control}
              rules={{
                required: translations["pages"]["add-ticket"]["required"],
              }}
              render={({ field }) => (
                <Select
                  options={mappedLocationTags}
                  onChange={(e) => field.onChange(e!.value)}
                  placeholder={
                    translations["pages"]["add-ticket"]["chooseLocation"]
                  }
                  isClearable
                  isSearchable={false}
                  ref={field.ref}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="where_to_tag"
              render={({ message }) => (
                <p className="text-red-500 text-xs mt-1">{message}</p>
              )}
            />
          </FormField>

          <FormField
            title={translations["pages"]["add-ticket"]["adults"]}
            disclaimer={translations["pages"]["add-ticket"]["adultsAge"]}
          >
            <Input
              min={0}
              type={"number"}
              placeholder={translations["pages"]["add-ticket"]["adultsHint"]}
              variant="outline"
              inputMode="numeric"
              {...register("adults")}
            />
          </FormField>

          <FormField
            title={translations["pages"]["add-ticket"]["children"]}
            disclaimer={translations["pages"]["add-ticket"]["childrenAge"]}
          >
            <Input
              min={0}
              type={"number"}
              placeholder={translations["pages"]["add-ticket"]["childrenHint"]}
              variant="outline"
              inputMode="numeric"
              {...register("children")}
            />
          </FormField>

          <div className="flex flex-col">
            <Checkbox
              ml={2}
              value={1}
              defaultChecked={false}
              {...register("has_pets")}
            >
              {translations["pages"]["add-ticket"]["has-pets"]}
            </Checkbox>
            <Checkbox
              ml={2}
              value={1}
              defaultChecked={false}
              {...register("trip_extra_luggage")}
            >
              {translations["addTicket"]["need"]["extraLuggage"]}
            </Checkbox>
          </div>

          <FormField title={translations["addTicket"]["need"]["when"]}>
            <Input
              type={"text"}
              placeholder={translations["addTicket"]["need"]["when"]}
              variant="outline"
              inputMode="text"
              {...register("trip_when_text")}
            />
          </FormField>

          <div>
            <Checkbox
              m={2}
              checked={exactDate}
              onChange={() => setExactDate(!exactDate)}
            >
              {translations.addTicket.transport.iKnowExactDate}
            </Checkbox>

            {exactDate && (
              <Input
                type="datetime-local"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                {...register("trip_when_date")}
              />
            )}
          </div>

          <FormField
            title={translations["pages"]["add-ticket"]["who-needs-it"]}
            disclaimer={
              translations["pages"]["add-ticket"]["name-surname-or-org-name"]
            }
          >
            <Textarea
              placeholder={translations["pages"]["add-ticket"]["who-needs-it"]}
              variant="outline"
              {...register("who")}
            />
          </FormField>

          <FormField
            title={translations["pages"]["add-ticket"].title}
            disclaimer={translations["pages"]["add-ticket"]["title-hint"]}
          >
            <Input
              placeholder={translations["pages"]["add-ticket"].title}
              variant="outline"
              {...register("what")}
            />
          </FormField>

          <FormField
            title={translations["pages"]["add-ticket"]["what-do-you-need"]}
          >
            <Textarea
              rows={4}
              placeholder={
                translations["pages"]["add-ticket"]["what-do-you-need"]
              }
              variant="outline"
              {...register("description")}
            />
          </FormField>

          <div>
            {addTicketMutation.isError ? (
              <div className="flex space-x-1 mt-2 items-center justify-center">
                <div
                  className="inline-flex items-center w-full place-content-center
                py-1 border border-transparent shadow-sm text-sm
                font-medium bg-red-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                text-white cursor-default"
                >
                  {translations["errors"]["error-occured-while-adding"]}
                  {addTicketMutation.error.message}
                </div>
              </div>
            ) : null}

            {addTicketMutation.isSuccess ? (
              <div className="flex space-x-1 mt-2 items-center justify-center">
                <div
                  className="inline-flex items-center w-full place-content-center
                py-1 border border-transparent shadow-sm text-sm
                font-medium text-white bg-green-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-default"
                >
                  {translations["pages"]["add-ticket"]["request-added"]}
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-4 w-full relative inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black ${
              isDisabled ? "bg-gray-300" : "bg-amber-300 hover:bg-amber-400"
            } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <PlusSVG />
            <span>{translations["/tickets/add"]}</span>
          </button>
        </form>
      </div>
    </>
  )
}
