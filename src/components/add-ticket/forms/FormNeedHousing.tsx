import { Checkbox, Input, Textarea } from "@chakra-ui/react"
import { useTranslations } from "../../../hooks/translations"
import { useForm, Controller } from "react-hook-form"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import React, { useState, useMemo, useEffect } from "react"
import { PlusSVG } from "../../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"
import { getRootContainer } from "../../../services/_root-container"
import Select from "react-select"

import { RouteDefinitions } from "../../../utils/routes"
import { NeedHousingPostData } from "../../../services/ticket.type"
import { FormField } from "../FormField"
import { ErrorMessage } from "@hookform/error-message"
import { FormFeedback } from "./Feedback"
import { useAddHousingTicket } from "./hooks"
import { NeedHousingTypeFormData } from "../../../services/type.need"

const ticketService = getRootContainer().containers.ticketService

export const FormNeedHousing = () => {
  const router = useRouter()
  const translations = useTranslations()

  // Silly State
  const [hasPets, setHasPets] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: authSession, status: authStatus } = useSession()
  const { data: locationTags = [] } = useQuery(`location-tags`, () => {
    return ticketService.locationTags()
  })
  const addTicketMutation = useAddHousingTicket({
    onSuccess: (rawResponse) => {
      const { data } = rawResponse.data
      const id = data.id

      toast.success(translations["pages"]["add-ticket"]["need-added"])

      setTimeout(() => {
        return router.push(
          RouteDefinitions.TicketDetails.replace(":id", String(id))
        )
      }, 1000)
    },
  })

  const mappedLocationTags = useMemo(() => {
    return [
      {
        value: 99,
        label: "Anywhere",
      },
      ...locationTags
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
        .sort((a, b) => a.label.localeCompare(b.label)),
    ]
  }, [locationTags])

  const useFormOptions = {}

  // type CurrentHousingPostData = NeedHousingPostData
  type CurrentHousingPostData = NeedHousingTypeFormData

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CurrentHousingPostData>(useFormOptions)

  const submitNeed = async (data: CurrentHousingPostData) => {
    setIsSubmitting(true)

    if (authStatus === "unauthenticated" || !authSession?.user) {
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    const postData: CurrentHousingPostData = {
      ...data,
      phone: authSession.phoneNumber,
      need_tag_id: [],
    }

    addTicketMutation.mutate(postData, {
      onError: () => setIsSubmitting(false),
    })
  }

  // On Form Data change
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "housing_pets") {
        console.log(Boolean(value))
        setHasPets(Boolean(value?.housing_pets))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const isDisabled = addTicketMutation.isLoading || isSubmitting
  return (
    <>
      <div className="mb-8 bg-white">
        <form onSubmit={handleSubmit(submitNeed)}>
          <FormField title={translations["pages"]["add-ticket"]["where"]}>
            <Controller
              name="housing_where_location_tag"
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
              name="housing_where_location_tag"
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

          {/* <FormField title={translations["addTicket"]["need"]["howLong"]}>
            <Input
              type={"text"}
              placeholder={translations["addTicket"]["need"]["howLong"]}
              variant="outline"
              inputMode="text"
              {...register("housing_how_long_text")}
            />
          </FormField> */}

          {/* TIME  START */}
          <div className="bg-gray-300">
            <h3>Starting when?</h3>
            <FormField
              title={"Starting When?"}
              disclaimer={translations["pages"]["add-ticket"]["childrenAge"]}
            >
              <Input
                type="date"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                {...register("housing_when_arrive")}
              />
            </FormField>

            <Checkbox
              ml={2}
              value={1}
              defaultChecked={false}
              {...register("housing_arrive_exact")}
            >
              {/* {translations.addTicket.housing.arrivalDateIsFlexible} */}
              My arrival date can change
            </Checkbox>
          </div>

          <div className="bg-blue-300">
            <h3>I need housing until</h3>
            <FormField
              title={"Leaving when?"}
              disclaimer={translations["pages"]["add-ticket"]["childrenAge"]}
            >
              <Input
                type="date"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                {...register("housing_when_leave")}
              />
            </FormField>

            <Checkbox
              ml={2}
              value={1}
              defaultChecked={false}
              {...register("housing_leave_exact")}
            >
              {/* {translations.addTicket.housing.arrivalDateIsFlexible} */}
              My departure date can change
            </Checkbox>
          </div>

          {/* TIME  END */}

          <div className="flex flex-col">
            <Checkbox
              ml={2}
              value={1}
              defaultChecked={false}
              {...register("housing_pets")}
            >
              {translations["pages"]["add-ticket"]["has-pets"]}
            </Checkbox>
          </div>
          {hasPets && (
            <FormField title={translations["pages"]["add-ticket"]["has-pets"]}>
              <Input
                type="text"
                placeholder={translations["pages"]["add-ticket"]["petsHint"]}
                variant="outline"
                {...register("housing_pets_description")}
              />
            </FormField>
          )}

          <div className="flex flex-col mt-4">
            <Checkbox
              value={1}
              defaultChecked={false}
              {...register("housing_can_help_with_rent")}
            >
              {translations["pages"]["add-ticket"]["rentHelp"]}
            </Checkbox>
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
          <FormFeedback mutation={addTicketMutation} />
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
