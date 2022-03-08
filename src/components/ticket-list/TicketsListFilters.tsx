import { FiltersBadges, FiltersDropdown } from "../Filters"
import React, { useCallback, useMemo } from "react"
import { useRouter } from "next/router"
import { TRANSPORT_TAG } from "./TicketsList"
import { useTranslations } from "../../hooks/translations"
import { NeedTagType } from "../../services/ticket.type"

type TicketsListFiltersProps = {
  tags: NeedTagType[]
  locationTags: {
    id: number
    location_type: string
    name: string
  }[]
  selectedTag: number
  whereFromTag: number
  whereToTag: number
}

export const TicketsListFilters = (props: TicketsListFiltersProps) => {
  const { tags, locationTags, selectedTag, whereFromTag, whereToTag } = props
  const router = useRouter()
  const translations = useTranslations()

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
    () => selectedTag === TRANSPORT_TAG,
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

      {isTransport && (
        <div className="mx-auto md:max-w-xl md:mt-4">
          <div className="md:grid grid-cols-2 gap-4">
            <FiltersDropdown
              data={locationTags}
              onSelectFilter={onWhereFromClick}
              activeTag={whereFromTag}
              placeholder={translations["filters"]["whereFrom"]}
            />
            <FiltersDropdown
              data={locationTags}
              onSelectFilter={onWhereToClick}
              activeTag={whereToTag}
              placeholder={translations["filters"]["whereTo"]}
            />
          </div>
        </div>
      )}
    </>
  )
}
