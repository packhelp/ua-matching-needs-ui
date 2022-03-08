import {
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useTranslations } from "../../hooks/translations"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { useState, useMemo } from "react"
import { PlusSVG } from "../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"
import { getRootContainer } from "../../services/_root-container"
import Select, { SingleValue } from "react-select"

import { RouteDefinitions } from "../../utils/routes"
import { NeedTripPostData } from "../../services/ticket.type"
import { TagConstIds } from "../../services/types.tag"

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
  const { data: authSession, status: authStatus } = useSession()
  const [whereFromTag, setWhereFromTag] = useState<number | undefined>(
    undefined
  )
  const [whereToTag, setWhereToTag] = useState<number | undefined>(undefined)
  const { data: locationTags = [] } = useQuery(`location-tags`, () => {
    return ticketService.locationTags()
  })

  const mappedLocationTags = useMemo(() => {
    return locationTags.map((tag) => {
      let name = tag.name

      if (tag.location_type === "help_center" && tag.short_name != null) {
        name = tag.short_name
      }

      return {
        value: tag.id,
        label: name,
      }
    })
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
        description,
        adults,
        children,
        has_pets,
        trip_when_text,
        trip_when_date, // TODO:
        trip_extra_luggage,
      } = newTicket
      const expirationTimestampSane = dayjs().add(24, "hour").format()

      const newTicketData = {
        description,
        expirationTimestampSane,
        phone,
        count: 0,
        adults: adults ? adults : 0,
        children: children ? children : 0,
        has_pets: !has_pets ? "0" : "1",

        // This is trip, so hardcore a trip tag
        need_tag_id: [{ need_tag_id: { id: TagConstIds.transport } }],

        // tripe specific
        need_type: "trip",
        where_to_tag: whereToTag,
        where_from_tag: whereFromTag,
        trip_when_date, // TODO:
        trip_when_text,
        trip_extra_luggage,
      }

      return axios.post(`/api/add-ticket`, newTicketData)
    },
    {
      onSuccess,
    }
  )

  const useFormOptions = {}

  const { register, handleSubmit } = useForm<NeedTripPostData>(useFormOptions)

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
      <Stack marginBottom="16px">
        <form onSubmit={handleSubmit(submitNeed)}>
          <Stack>
            <Heading as="h2" size="l">
              {translations["pages"]["add-ticket"]["whereFrom"]}
            </Heading>
            <Select
              options={mappedLocationTags}
              onChange={(
                newValue: SingleValue<{ value: number; label: string }>
              ) => {
                setWhereFromTag(newValue ? newValue.value : undefined)
              }}
              placeholder={
                translations["pages"]["add-ticket"]["chooseLocation"]
              }
              isClearable
              isSearchable={false}
            />

            <Heading as="h2" size="l" mt="4">
              {translations["pages"]["add-ticket"]["whereTo"]}
            </Heading>
            <Select
              options={mappedLocationTags}
              onChange={(
                newValue: SingleValue<{ value: number; label: string }>
              ) => {
                setWhereToTag(newValue ? newValue.value : undefined)
              }}
              placeholder={
                translations["pages"]["add-ticket"]["chooseLocation"]
              }
              isClearable
              isSearchable={false}
            />
            <Stack marginBottom="16px">
              <div className="flex justify-between">
                <Heading as="h2" size="l">
                  {translations["pages"]["add-ticket"]["adults"]}
                </Heading>
                {translations["pages"]["add-ticket"]["adultsAge"]}
              </div>
              <Input
                min={0}
                type={"number"}
                placeholder={translations["pages"]["add-ticket"]["adultsHint"]}
                variant="outline"
                inputMode="numeric"
                {...register("adults")}
              />
            </Stack>

            <Stack marginBottom="16px">
              <div className="flex justify-between">
                <Heading as="h2" size="l">
                  {translations["pages"]["add-ticket"]["children"]}
                </Heading>
                {translations["pages"]["add-ticket"]["childrenAge"]}
              </div>
              <Input
                min={0}
                type={"number"}
                placeholder={
                  translations["pages"]["add-ticket"]["childrenHint"]
                }
                variant="outline"
                inputMode="numeric"
                {...register("children")}
              />
            </Stack>

            <Checkbox
              value={1}
              defaultChecked={false}
              {...register("has_pets")}
            >
              {translations["pages"]["add-ticket"]["has-pets"]}
            </Checkbox>

            <Checkbox
              value={1}
              defaultChecked={false}
              {...register("trip_extra_luggage")}
            >
              {translations["addTicket"]["need"]["extraLuggage"]}
            </Checkbox>

            <Stack marginBottom="16px">
              <div className="flex justify-between">
                <Heading as="h2" size="l">
                  {translations["addTicket"]["need"]["when"]}
                </Heading>
              </div>
              <Input
                type={"text"}
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                inputMode="text"
                {...register("trip_when_text")}
              />
            </Stack>

            {/* EXPERIMNET */}
            {/* <Stack marginBottom="16px">
              <div className="flex justify-between">
                <Heading as="h2" size="l">
                  {translations["addTicket"]["need"]["when"]}
                </Heading>
              </div>
              <Input
                type="date"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                inputMode="text"
                {...register("trip_when_date")}
              />
            </Stack> */}

            {/* TITLE  */}
            <Stack>
              <Heading as="h2" size="l">
                {translations["pages"]["add-ticket"].title}
              </Heading>
              <Input
                placeholder={translations["pages"]["add-ticket"].title}
                variant="outline"
                {...register("what")}
              />
            </Stack>
            {/* DEscription  */}
            <Stack>
              <Heading as="h2" size="l">
                {translations["pages"]["add-ticket"]["what-do-you-need"]}
              </Heading>

              <Textarea
                rows={4}
                placeholder={
                  translations["pages"]["add-ticket"]["what-do-you-need"]
                }
                variant="outline"
                {...register("description")}
              />
            </Stack>

            {addTicketMutation.isError ? (
              <Text color={"red"}>
                {translations["errors"]["error-occured-while-adding"]}
                {addTicketMutation.error.message}
              </Text>
            ) : null}

            {addTicketMutation.isSuccess ? (
              <Text>
                {translations["pages"]["add-ticket"]["request-added"]}
              </Text>
            ) : null}

            <div className="h-4 hidden md:block" />

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full relative inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black ${
                isDisabled ? "bg-gray-300" : "bg-amber-300 hover:bg-amber-400"
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <PlusSVG />
              <span>{translations["/tickets/add"]}</span>
            </button>
          </Stack>
        </form>
      </Stack>
    </>
  )
}
