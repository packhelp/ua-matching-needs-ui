import { Heading, Input } from "@chakra-ui/react"
import { LocationFromNavigator } from "./LocationFromNavigator"

type LocationPickerProps = {
  value: string
  header: string
  showModal: () => void
}

export const LocationPicker = (props: LocationPickerProps) => {
  const { showModal, value, header } = props

  return (
    <div>
      <Heading as="h2" size="l">
        {header}
      </Heading>

      <div className="mt-1 mb-4" onClick={showModal}>
        <Input readOnly type="text" variant="outline" value={value} />
      </div>
    </div>
  )
}
