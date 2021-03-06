import { Checkbox, Input, Textarea } from "@chakra-ui/react"
import { useTranslations } from "../../../hooks/translations"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import React, { useState } from "react"
import { PlusSVG } from "../../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"
import { RouteDefinitions } from "../../../utils/routes"
import { NeedTripPostData } from "../../../services/ticket.type"
import { FormField } from "../FormField"
import { FormFeedback } from "./Feedback"
import { useAddTransportTicket } from "../hooks/use-add-ticket"
import { LocationField } from "./fields/Location"

export type TransportNeededVariant = "whereFrom" | "whereTo"
export type InputValuesType = {
  [key in TransportNeededVariant]: {
    value: number | undefined
    label: string | undefined
  }
}

export const FormNeedTransport = () => {
  const router = useRouter()
  const translations = useTranslations()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exactDate, setExactDate] = useState(false)
  const { data: authSession, status: authStatus } = useSession()
  const addTicketMutation = useAddTransportTicket({
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
          <LocationField errors={errors} control={control} name="where_from" />
          <LocationField
            errors={errors}
            control={control}
            name="where_destination"
            title={translations["pages"]["add-ticket"]["whereTo"]}
          />

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
              {translations.addTicket.date.iKnowExactDate}
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
