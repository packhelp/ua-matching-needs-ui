import { getRootContainer } from "../../../services/_root-container"
import { useQuery } from "react-query"

export const useLocationTags = () => {
  const ticketService = getRootContainer().containers.ticketService

  const { data: locationTags = [] } = useQuery(`location-tags`, () =>
    ticketService.locationTagsForHousing()
  )

  const mappedLocationTags = locationTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }))

  return { mappedLocationTags, locationTags }
}
