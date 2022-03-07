import { Button } from "@chakra-ui/react"
import React, { Dispatch, SetStateAction } from "react"
import { usePosition } from "../add-ticket.hooks"
import { InputValuesType } from "../TransportLocationSection"

export const LocationFromNavigator = ({
  setCoords,
  closeModal,
  setSelected,
}: {
  setCoords: Dispatch<
    SetStateAction<{
      latitude: number | undefined
      longitude: number | undefined
    }>
  >
  closeModal: () => void
  setSelected: Dispatch<SetStateAction<InputValuesType>>
}) => {
  const { latitude, longitude, error } = usePosition()
  const shareLocation = () => {
    if (error) return

    setCoords({ latitude, longitude })
    setSelected((prev) => ({
      ...prev,
      whereFrom: {
        label: undefined,
        value: undefined,
      },
    }))
    closeModal()
  }
  return (
    <Button mt={4} type="button" colorScheme="blue" onClick={shareLocation}>
      Udostępnij swoją lokalizację
    </Button>
  )
}
