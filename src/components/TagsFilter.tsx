import { useQuery } from "react-query"
import { Tag } from "./Tag"
import { VoidFunctionComponent } from "react"
import { getRootContainer } from "../services/_root-container"

type TagsFilterProps = {
  currentTagId?: number
  onChangeTag: (tagId: number) => void
}

const ticketService = getRootContainer().containers.ticketService

export const TagsFilter: VoidFunctionComponent<TagsFilterProps> = ({
  currentTagId,
  onChangeTag,
}) => {
  const { data: tags } = useQuery(`main-tags`, () => {
    return ticketService.mainTags()
  })
  if (!tags) return null

  return (
    <div className={"text-center"}>
      <Tag
        tag={{ id: 0, name: "Wszystkie", background_color: null }}
        onClick={onChangeTag}
        active={!currentTagId}
        className={"cursor-pointer"}
      />

      {(tags || []).map((tag) => {
        return (
          <Tag
            key={tag.id}
            tag={tag}
            onClick={onChangeTag}
            active={currentTagId === tag.id}
            className={"cursor-pointer"}
          />
        )
      })}
    </div>
  )
}
