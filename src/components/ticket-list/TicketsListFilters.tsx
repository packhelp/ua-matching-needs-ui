import { FiltersBadges, FiltersDropdown } from "../Filters"
import React, { useCallback, useMemo } from "react"
import { useRouter } from "next/router"
import { NeedTagType } from "../../services/ticket.type"
import { TagConstIds } from "../../services/types.tag"

type TicketsListFiltersProps = {
  tags: NeedTagType[]
  locationTags: {
    id: number
    location_type: string
    name: string
  }[]
  selectedTag: number
}

export const TicketsListFilters = (props: TicketsListFiltersProps) => {
  const { tags, selectedTag } = props
  const router = useRouter()

  const onTagClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.tag = tag.toString()
      } else {
        delete router.query.tag
      }

      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

  const onWhereToClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.where_to = tag.toString()
      } else {
        delete router.query.where_to
      }
      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

  const onWhereFromClick = useCallback(
    (tag?: number) => {
      if (tag) {
        router.query.where_from = tag.toString()
      } else {
        delete router.query.where_from
      }
      router.query.page = "1"
      router.push(router)
    },
    [router]
  )

  const isTransport = useMemo(
    () => selectedTag === TagConstIds.transport,
    [selectedTag]
  )

  return (
    <>
      <div className="block md:hidden">
        <FiltersDropdown
          data={tags}
          onSelectFilter={onTagClick}
          activeTag={selectedTag}
        />
      </div>

      <div className="text-center hidden md:block">
        <FiltersBadges
          data={tags}
          onSelectFilter={onTagClick}
          activeTag={selectedTag}
        />
      </div>
    </>
  )
}
