import { LocationTag, NeedTagType } from "./ticket.type"
import { getRootContainer } from "./_root-container"

const ts = getRootContainer().containers.ticketService

interface TicketsListServerSideProps {
  query: {
    tag?: string
  }
}
export interface TicketsListPageProps {
  tags: NeedTagType[]
  locationTags: LocationTag[]
  currentTag?: NeedTagType
}

export const ticketsListServerSideProps = async ({
  query: { tag },
}: TicketsListServerSideProps) => {
  const tags = await ts.mainTags()
  const locationTags = await ts.locationTags()
  const returnParams = {
    tags,
    locationTags,
  }

  let currentTag
  if (tag) {
    currentTag = tags.find((t) => t.id.toString() === tag)
    if (currentTag) {
      returnParams["currentTag"] = currentTag
    }
  }

  return returnParams
}
