import Select from "react-select"
import { Tag } from "./Tag"
import { useMemo } from "react"
import { useTranslations } from "../hooks/translations"
import { useTagTranslation } from "../hooks/useTagTranslation"

type FiltersProps = {
  data: any
  onSelectFilter: (tag: any) => void
  activeTag?: any
}

interface FiltersDropdownProps extends FiltersProps {
  placeholder?: string
}

export const FiltersDropdown = (props: FiltersDropdownProps) => {
  const { getTranslation } = useTagTranslation()
  const translation = useTranslations()
  const {
    data,
    onSelectFilter,
    placeholder = translation["filters"]["selectNeeds"],
    activeTag,
  } = props

  const mappedTags = useMemo(() => {
    return data.map((tag) => ({
      value: tag.id,
      label: getTranslation(tag),
    }))
  }, [data, getTranslation])

  /* hax - without it value is not refreshed 🤷 */
  const currentActiveTag = useMemo(
    () => mappedTags.find((tag) => tag.value === activeTag) || undefined,
    [mappedTags, activeTag]
  )

  return (
    <div className="mt-2 md:mt-0">
      <Select
        instanceId="filters"
        options={mappedTags}
        onChange={(tag: { value: number } | null) => onSelectFilter(tag?.value)}
        placeholder={placeholder}
        value={currentActiveTag}
        isClearable
        isSearchable={false}
      />
    </div>
  )
}

export const FiltersBadges = (props: FiltersProps) => {
  const { data, onSelectFilter, activeTag } = props
  const translation = useTranslations()

  return (
    <>
      <Tag
        tag={{
          id: 0,
          name: translation["filters"]["all"],
          background_color: null,
        }}
        onClick={onSelectFilter}
        active={!activeTag}
        className={"cursor-pointer"}
      />

      {(data || []).map((tag) => {
        return (
          <Tag
            key={tag.id}
            tag={tag}
            onClick={onSelectFilter}
            active={activeTag === tag.id}
            className={"cursor-pointer"}
          />
        )
      })}
    </>
  )
}
