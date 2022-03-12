import { Checkbox, Input, Textarea } from "@chakra-ui/react"
import { useTranslations } from "../../../hooks/translations"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import React, { useState, useEffect } from "react"
import { PlusSVG } from "../../../assets/styled-svgs/plus"
import { useSession } from "next-auth/react"

import { RouteDefinitions } from "../../../utils/routes"
import { FormField } from "../FormField"
import { ErrorMessage } from "@hookform/error-message"
import { FormFeedback } from "./Feedback"
import { useAddHousingTicket } from "./hooks"
import { NeedHousingTypeFormData } from "../../../services/type.need"
import classNames from "classnames"
import { housingFromOptions, housingUntilOptions, TODAY } from "./constants"
import { LocationField } from "./Fields/Location"
import { GenericError } from "./Fields/GenericError"
import { toBool } from "./hooks"

export const FormNeedHousing = () => {
  const router = useRouter()
  const translations = useTranslations()

  // Silly State
  const [formState, setFormState] = useState({
    housing_pets: false,
    // arrive
    housing_arrive_exact: false,
    housing_when_arrive: TODAY,
    housing_when_arrive_text: null,

    // leave
    housing_leave_exact: false,
    housing_when_leave_text: null,

    // non form
    isSubmitting: false,
  })

  const { data: authSession, status: authStatus } = useSession()

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

  type CurrentHousingPostData = NeedHousingTypeFormData

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<CurrentHousingPostData>({
    defaultValues: {
      housing_when_arrive: TODAY,
    },
  })

  const submitNeed = async (data: CurrentHousingPostData) => {
    setFormState((state) => ({
      ...state,
      isSubmitting: true,
    }))

    if (authStatus === "unauthenticated" || !authSession?.user) {
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    const postData: CurrentHousingPostData = {
      ...data,
      phone: authSession.phoneNumber,
    }

    addTicketMutation.mutate(postData, {
      onError: () =>
        setFormState((state) => ({
          ...state,
          isSubmitting: false,
        })),
    })
  }

  // On Form Data change
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const formName = name as string
      setFormState((state) => ({
        ...state,
        [formName]: value[formName],
      }))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const formStateNormal = Object.assign({}, formState)

  formStateNormal.housing_pets = toBool(formState.housing_pets)
  formStateNormal.housing_arrive_exact = toBool(formState.housing_arrive_exact)
  formStateNormal.housing_leave_exact = toBool(formState.housing_leave_exact)
  formStateNormal.isSubmitting = toBool(formState.isSubmitting)

  const isDisabled = addTicketMutation.isLoading || formState.isSubmitting

  return (
    <>
      <div className="mb-8 bg-white">
        <form onSubmit={handleSubmit(submitNeed)}>
          <LocationField
            control={control}
            name="housing_where_location_tag"
            errors={errors}
          />
          <div>
            <FormField title={translations.addTicket.housing.housingFrom}>
              <div className="sm:flex gap-2">
                <span className="relative z-0 flex sm:inline-flex shadow-sm rounded-md mb-2 sm:mb-0">
                  {housingFromOptions.map(({ label, value }, idx) => (
                    <button
                      onClick={() => setValue("housing_when_arrive", value)}
                      key={value}
                      type="button"
                      className={classNames(
                        formStateNormal.housing_when_arrive === value
                          ? "bg-indigo-500 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-700",
                        idx === 0 && "rounded-l-md",
                        idx === housingFromOptions.length - 1 && "rounded-r-md",
                        "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium   focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto justify-center"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </span>
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
              </div>
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
            {formStateNormal.housing_leave_exact ? (
              <Input
                type="date"
                placeholder={translations["addTicket"]["need"]["when"]}
                variant="outline"
                {...register("housing_when_leave")}
              />
            ) : (
              <span className="relative z-0 flex shadow-sm rounded-md">
                {housingUntilOptions.map(({ label, value }, idx) => (
                  <button
                    onClick={() => {
                      setValue("housing_when_leave", value)
                      setValue("housing_when_leave_text", label)
                    }}
                    key={value}
                    type="button"
                    className={classNames(
                      formState.housing_when_leave_text === label
                        ? "bg-indigo-500 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-700",
                      idx === 0 && "rounded-l-md",
                      idx === housingUntilOptions.length - 1 && "rounded-r-md",
                      "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium   focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full justify-center"
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
              {...register("housing_leave_exact")}
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
          {formStateNormal.housing_pets && (
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
