import { Button, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslations } from "../../hooks/translations"
import { TransportNeededModal } from "./TransportNeededModal"
import { LocationPicker } from "./partials/LocationPicker"

export type TransportNeededVariant = "whereFrom" | "whereTo"

export type InputValuesType = {
  [key in TransportNeededVariant]: {
    value: number | undefined
    label: string | undefined
  }
}

const defaultState = {
  value: undefined,
  label: undefined,
}

const defaultInputValuesState = {
  whereFrom: defaultState,
  whereTo: defaultState,
}

export const TransportLocationSection = () => {
  const translations = useTranslations()
  const [variant, setVariant] = useState<TransportNeededVariant>()

  const showWhereFromModal = () => setVariant("whereFrom")
  const showWhereToModal = () => setVariant("whereTo")
  const hideModal = () => setVariant(undefined)

  const [inputValues, setInputValues] = useState<InputValuesType>(
    defaultInputValuesState
  )

  const [coords, setCoords] = useState<{
    latitude: number | undefined
    longitude: number | undefined
  }>({
    latitude: undefined,
    longitude: undefined,
  })

  const handleSubmitForm = () => {
    console.log({ inputValues, coords })
  }

  const resetModal = () => {
    if (!variant) return

    setInputValues((prev) => ({
      ...prev,
      [variant]: defaultState,
    }))
    setCoords({
      latitude: undefined,
      longitude: undefined,
    })
    hideModal()
  }

  return (
    <>
      <Stack marginBottom="16px">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmitForm()
          }}
        >
          {/* SKĄD */}
          <LocationPicker
            header={translations["pages"]["add-ticket"].whereFrom}
            value={
              coords.latitude
                ? "Udostępniono lokalizację"
                : inputValues.whereFrom.label || "Wybierz miasto"
            }
            showModal={showWhereFromModal}
          />
          {/* SKĄD */}

          {/* DOKĄD */}
          <LocationPicker
            header={translations["pages"]["add-ticket"].whereTo}
            value={inputValues.whereTo.label || "Wybierz miasto"}
            showModal={showWhereToModal}
          />
          {/* DOKĄD */}

          {/* SUBMIT */}
          <Button type="submit" mt={4} colorScheme="blue" isFullWidth>
            {translations.pages["add-ticket"]["add-need"]}
          </Button>
          {/* SUBMIT */}
        </form>
      </Stack>

      {variant !== undefined && (
        <TransportNeededModal
          variant={variant}
          selected={inputValues}
          closeModal={hideModal}
          resetModal={resetModal}
          setSelected={setInputValues}
          setCoords={setCoords}
        />
      )}
    </>
  )
}
