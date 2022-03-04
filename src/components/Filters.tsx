import Select from "react-select"
import { Tag } from "./Tag"
import { useMemo } from "react"

type FiltersProps = {
  data: any
  onSelectFilter: (tag: any) => void
  activeTag?: any
}

export const FiltersMobile = (props: FiltersProps) => {
  const { data, onSelectFilter } = props

  const mappedTags = useMemo(() => {
    let newTags = data.map((tag) =>  {
      return { value: tag.id, label: tag.name }
    })

    return [
      { value: 0, label: "Wszystkie" },
      ...newTags
    ]
  }, [data])

  return (
    <div className="block md:hidden">
      <Select
        defaultValue={0}
        options={mappedTags}
        onChange={(tag: any) => onSelectFilter(tag.value)}
        placeholder={"Wybierz rodzaj potrzeby"}
      />
    </div>
  )
}

export const FiltersDesktop = (props: FiltersProps) => {
  const { data, onSelectFilter, activeTag } = props

  return (
    <div className="text-center hidden md:block">
      <Tag
        tag={{ id: 0, name: "Wszystkie" }}
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