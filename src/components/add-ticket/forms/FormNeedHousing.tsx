import { Checkbox, Input, Textarea } from "@chakra-ui/react"
import { useTranslations } from "../../../hooks/translations"
import { useForm, Controller, useWatch } from "react-hook-form"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import React, { useState, useMemo, useEffect } from "react"
import { PlusSVG } from "../../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"
import { getRootContainer } from "../../../services/_root-container"
import Select from "react-select"

import { RouteDefinitions } from "../../../utils/routes"
import { FormField } from "../FormField"
import { ErrorMessage } from "@hookform/error-message"
import { FormFeedback } from "./Feedback"
import { useAddHousingTicket } from "./hooks"
import { NeedHousingTypeFormData } from "../../../services/type.need"
import dayjs from "dayjs"
import classNames from "classnames"

const ticketService = getRootContainer().containers.ticketService

const GenericError = ({ message }: { message: React.ReactNode }) => (
  <p className="text-red-500 text-xs mt-1">{message}</p>
)

export const FormNeedHousing = () => {
  const router = useRouter()
  const translations = useTranslations()

  // Silly State
  const [hasPets, setHasPets] = useState(false)
  const [exactLeaveDate, setExactLeaveDate] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: authSession, status: authStatus } = useSession()
  const { data: locationTags = [] } = useQuery(`location-tags`, () => {
    return ticketService.locationTagsForHousing()
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
    return locationTags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }))
  }, [locationTags])

  const useFormOptions = {}

  type CurrentHousingPostData = NeedHousingTypeFormData

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    getValues,
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
    }

    addTicketMutation.mutate(postData, {
      onError: () => setIsSubmitting(false),
    })
  }

  // On Form Data change
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "housing_pets") {
        setHasPets(Boolean(value?.housing_pets))
      }
      if (name === "housing_when_leave_exact") {
        setExactLeaveDate(value?.housing_when_leave_exact)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])
  useWatch({ name: "housing_when_leave", control })

  const housingUntilOptions = [
    { value: dayjs().add(2, "day").toString(), label: "A night or two" },
    { value: dayjs().add(5, "day").toString(), label: "A couple of days" },
    { value: dayjs().add(2, "weeks").toString(), label: "A couple of weeks" },
    { value: "", label: "No idea" },
  ]

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
              render={GenericError}
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

          <div>
            <FormField title={translations.addTicket.housing.housingFrom}>
              <Controller
                name="housing_when_arrive"
                control={control}
                rules={{
                  required: translations.addTicket.form.required,
                }}
                render={() => (
                  <Input
                    type="date"
                    placeholder={translations["addTicket"]["need"]["when"]}
                    variant="outline"
                    {...register("housing_when_arrive")}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="housing_when_arrive"
                render={GenericError}
              />
            </FormField>

            <Checkbox
              mt={4}
              value={1}
              defaultChecked={false}
              {...register("housing_arrive_exact")}
            >
              {translations.addTicket.housing.arrivalDateIsFlexible}
            </Checkbox>
          </div>

          <FormField title={translations.addTicket.housing.housingUntil}>
            {exactLeaveDate ? (
              <Input
                type="date"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                {...register("housing_when_leave")}
              />
            ) : (
              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                {housingUntilOptions.map(({ label, value }, idx) => (
                  <button
                    onClick={() => {
                      setValue("housing_when_leave", value)
                      setValue("housing_when_leave_hint", label)
                    }}
                    key={value}
                    type="button"
                    className={classNames(
                      getValues("housing_when_leave_hint") === label
                        ? "bg-indigo-500 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700",
                      idx === 0 && "rounded-l-md",
                      idx === housingUntilOptions.length - 1 && "rounded-r-md",
                      "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium   focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </span>
            )}
            <Checkbox
              value={1}
              mt={2}
              defaultChecked={false}
              {...register("housing_when_leave_exact")}
            >
              I know the exact date
              {/* {translations["pages"]["add-ticket"]["has-pets"]} */}
            </Checkbox>
          </FormField>

          <div className="flex flex-col mt-4">
            <Checkbox
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
