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

const ticketService = getRootContainer().containers.ticketService

export const FormNeedHousing = () => {
  const router = useRouter()
  const translations = useTranslations()
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<NeedHousingPostData>(useFormOptions)

  const submitNeed = async (data: NeedHousingPostData) => {
    setIsSubmitting(true)

    if (authStatus === "unauthenticated" || !authSession?.user) {
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    const postData: NeedHousingPostData = {
      ...data,
      phone: authSession.phoneNumber,
      need_tag_id: [],
    }

    addTicketMutation.mutate(postData, {
      onError: () => setIsSubmitting(false),
    })
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "has_pets") {
        console.log(Boolean(value))
        setHasPets(Boolean(value?.has_pets))
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
              name="where_tag"
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
              name="where_tag"
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
          </div>
          {hasPets && (
            <FormField title={translations["pages"]["add-ticket"]["has-pets"]}>
              <Input
                placeholder={translations["pages"]["add-ticket"]["petsHint"]}
                variant="outline"
                {...register("petsNumber")}
              />
            </FormField>
          )}

          <FormField title={translations["addTicket"]["need"]["howLong"]}>
            <Input
              type={"text"}
              placeholder={translations["addTicket"]["need"]["howLong"]}
              variant="outline"
              inputMode="text"
              {...register("housing_how_long_text")}
            />
          </FormField>
          <div className="flex flex-col mt-4">
            <Checkbox
              value={1}
              defaultChecked={false}
              {...register("rentHelp")}
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
