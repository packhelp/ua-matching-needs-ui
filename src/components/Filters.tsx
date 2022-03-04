import Select from "react-select"
import { Tag } from "./Tag"
import { useMemo } from "react"
import { useTranslations } from "../hooks/translations"
import { useTagTranslation } from "../../pages/tickets/add"

type FiltersProps = {
  data: any
  onSelectFilter: (tag: any) => void
  activeTag?: any
}

export const FiltersMobile = (props: FiltersProps) => {
  const { data, onSelectFilter } = props
  const { getTranslation } = useTagTranslation()

  const translation = useTranslations()
  const mappedTags = useMemo(() => {
    const newTags = data.map((tag) => {
      return { value: tag.id, label: getTranslation(tag) }
    })

    return [{ value: 0, label: translation["filters"]["all"] }, ...newTags]
  }, [data])

  console.log({
    mappedTags,
  })

  return (
    <div className="block md:hidden">
      <Select
        defaultValue={0}
        options={mappedTags}
        onChange={(tag: any) => onSelectFilter(tag.value)}
        placeholder={translation["filters"]["selectNeeds"]}
      />
    </div>
  )
}

export const FiltersDesktop = (props: FiltersProps) => {
  const { data, onSelectFilter, activeTag } = props
  const translation = useTranslations()

  return (
    <div className="text-center hidden md:block">
      <Tag
        tag={{ id: 0, name: translation["filters"]["all"] }}
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
    </div>
  )
}
