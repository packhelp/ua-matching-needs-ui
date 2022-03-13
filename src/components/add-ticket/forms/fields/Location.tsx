import React from "react"
import Select from "react-select"
import { useTranslations } from "../../../../hooks/translations"
import { ErrorMessage } from "@hookform/error-message"
import { FormField } from "../../FormField"
import { Controller } from "react-hook-form"
import { GenericError } from "./GenericError"
import { useLocationTags } from "../../hooks/use-location-tags"

type LocationFieldProps = {
  control: any
  name: string
  title?: string
  errors?: any
}

export const LocationField = ({
  control,
  name,
  title,
  errors,
}: LocationFieldProps) => {
  const translations = useTranslations()
  const { mappedLocationTags } = useLocationTags()

  return (
    <FormField title={title || translations["pages"]["add-ticket"]["where"]}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: translations["pages"]["add-ticket"]["required"],
        }}
        render={({ field }) => (
          <Select
            options={mappedLocationTags}
            onChange={(e: any) => field.onChange(e!.value)}
            placeholder={translations["pages"]["add-ticket"]["chooseLocation"]}
            isClearable
            isSearchable={false}
            ref={field.ref}
          />
        )}
      />
      <ErrorMessage errors={errors} name={name} render={GenericError} />
    </FormField>
  )
}
