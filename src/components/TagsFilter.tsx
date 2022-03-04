import { useQuery } from "react-query"
import { getMainTags } from "../utils/tags"
import { Tag } from "./Tag"
import { VoidFunctionComponent } from "react"

type TagsFilterProps = {
  currentTagId?: number
  onChangeTag: (tagId: number) => void
}

export const TagsFilter: VoidFunctionComponent<TagsFilterProps> = ({
  currentTagId,
  onChangeTag,
}) => {
  const { data: tags = [] } = useQuery(`main-tags`, () => {
    return getMainTags()
  })

  return (
    <div className={"text-center"}>
      <Tag
        tag={{ id: 0, name: "Wszystkie" }}
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
