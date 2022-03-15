import React from "react"
import { useTranslations } from "../../../../hooks/translations"
import { ErrorMessage } from "@hookform/error-message"
import { FormField } from "../../FormField"
import { Controller } from "react-hook-form"
import { GenericError } from "./GenericError"

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useEffect, useRef } from "react"

export const PlacesInput = ({ onChange }) => {
  const translations = useTranslations()
  const mounted = useRef()
  const geocoderInput = useRef()

  useEffect(() => {
    if (!mounted?.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY,
        types: "country,region,place",
        placeholder: translations["pages"]["add-ticket"]["chooseLocation"],
        proximity: "ip",
      })

      geocoder.addTo(geocoderInput.current)

      geocoder.on("result", (e) => onChange(e.result))

      geocoder.on("clear", () => onChange({}))
      // @ts-ignore
      mounted?.current = true
    }
  }, [onChange, translations])

  // @ts-ignore
  return <div ref={geocoderInput}></div>
}

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

  return (
    <FormField title={title || translations["pages"]["add-ticket"]["where"]}>
      <Controller
        name={name}
        control={control}
        // rules={{
        //   required: translations["pages"]["add-ticket"]["required"],
        // }}
        render={({ field }) => <PlacesInput onChange={field.onChange} />}
      />
      <ErrorMessage errors={errors} name={name} render={GenericError} />
    </FormField>
  )
}
