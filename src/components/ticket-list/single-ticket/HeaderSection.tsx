import React from "react"
import { Tag } from "../../Tag"
import { GiHouse } from "react-icons/gi"
import { IoMdCar } from "react-icons/io"

export const HeaderSection = ({ need }) => {
  return (
    <>
      <div className="mb-2 flex justify-between">
        <div className="flex items-center max-w-2xl mb-1 text-sm text-gray-400 space-x-1">
          {need.isTrip && <IoMdCar size={25} />}

          {need.isHousing && <GiHouse size={25} />}

          <span>
            {need.tags.map((tag) => {
              // TODO: move to ticket class
              if (!tag || !tag.need_tag_id || !tag.need_tag_id.id) {
                return null
              }

              return <Tag key={tag.need_tag_id.id} tag={tag.need_tag_id} />
            })}
          </span>
        </div>
        <span className="pr-1 my-1 text-xs">#{need.id}</span>
      </div>
    </>
  )
}
