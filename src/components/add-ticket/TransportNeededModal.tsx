import { useTranslations } from "../../hooks/translations"
import { Modal } from "../Modal"
import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { getRootContainer } from "../../services/_root-container"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { LocationFromNavigator } from "./partials/LocationFromNavigator"
import Select, { SingleValue } from "react-select"
import { InputValuesType, TransportNeededVariant } from "./FormNeedTransport"

type TransportNeededModalType = {
  variant: TransportNeededVariant
  selected: InputValuesType
  setSelected: Dispatch<SetStateAction<InputValuesType>>
  closeModal: () => void
  resetModal: () => void
  setCoords: Dispatch<
    SetStateAction<{
      latitude: number | undefined
      longitude: number | undefined
    }>
  >
}

const ticketService = getRootContainer().containers.ticketService

export const TransportNeededModal = (props: TransportNeededModalType) => {
  const { closeModal, resetModal, variant, selected, setSelected, setCoords } =
    props

  const { locale } = useRouter()
  const translations = useTranslations()
  const translationAddTicket = translations.addTicket.need

  const title =
    variant === "whereFrom"
      ? translationAddTicket.whereFromNeeded
      : translationAddTicket.whereToNeeded

  const { data: locationTags = [] } = useQuery(`location-tags`, () => {
    return ticketService.locationTags()
  })

  const mappedLocationTags = useMemo(
    () =>
      locationTags.map((tag) => {
        let name = tag.name

        if (tag.location_type === "help_center" && tag.short_name != null) {
          name = tag.short_name
        }

        return {
          value: tag.id,
          label: name,
        }
      }),
    [locationTags, locale]
  )

  const handleChangeLocation = (
    location: SingleValue<{
      value: number | undefined
      label: string | undefined
    }>
  ) => {
    setSelected((prev) => ({
      ...prev,
      [variant]: location,
    }))
    setCoords({
      latitude: undefined,
      longitude: undefined,
    })
  }

  const isDisabled = !Boolean(selected[variant].value)

  return (
    <Modal
      title={title}
      content={
        <>
          <div className="text-left">
            <Select
              isClearable
              value={selected[variant]}
              options={mappedLocationTags}
              isSearchable={false}
              placeholder={
                translations["pages"]["add-ticket"]["chooseLocation"]
              }
              onChange={(location) => handleChangeLocation(location)}
            />
            {/* {variant === "whereFrom" && (
              <LocationFromNavigator
                setCoords={setCoords}
                closeModal={closeModal}
                setSelected={setSelected}
              />
            )} */}
          </div>
        </>
      }
      onClose={resetModal}
      actions={
        <button
          type="button"
          onClick={closeModal}
          disabled={isDisabled}
          className={`${
            isDisabled
              ? "bg-gray-300 cursor-initial"
              : "bg-red-600 hover:bg-red-800  dark:hover:text-white dark:hover:bg-gray-600"
          } text-white focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500`}
        >
          Zapisz
        </button>
      }
    />
  )
}
