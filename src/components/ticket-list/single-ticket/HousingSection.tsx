import React from "react"
import { NeedHousing } from "../../../services/ticket.class"
import { GoPerson } from "react-icons/go"
import { MdChildFriendly } from "react-icons/md"
import { FaDog } from "react-icons/fa"

export const HousingSection = ({ need }: { need: NeedHousing }) => {
  return (
    <div className="flex justify-around border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1">
      {need.hasAdults && (
        <div className="flex gap-2 items-center">
          <GoPerson size={25} /> {need.dtoHousing.adults}
        </div>
      )}

      {need.hasChildren && (
        <div className="flex gap-2 items-center">
          <MdChildFriendly size={25} />
          {need.dtoHousing.children}
        </div>
      )}
      {need.hasPets && (
        <div className="flex gap-2 items-center">
          <FaDog size={25} />
          {need.dtoHousing.housing_pets
            ? need.dtoHousing.housing_pets_description
            : 0}
        </div>
      )}
    </div>
  )
}
