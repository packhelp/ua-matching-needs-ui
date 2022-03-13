import { GoPerson } from "react-icons/go"
import { FaClock, FaDog, FaMap } from "react-icons/fa"
import { MdChildFriendly } from "react-icons/md"
import { NeedHousing } from "../../../services/ticket.class"

export const HousingSection = ({ need }: { need: NeedHousing }) => {
  const { dtoHousing: housing } = need

  return (
    <div className="border-t border-b border-gray-200 bg-slate-50 px-4 py-5 p-1">
      <div className="flex justify-around ">
        {need.hasAdults && (
          <div className="flex gap-2 items-center">
            <GoPerson /> {housing.adults}
          </div>
        )}

        {need.hasChildren && (
          <div className="flex gap-2 items-center">
            <MdChildFriendly />
            {housing.children}
          </div>
        )}
        {housing.housing_pets && (
          <div className="flex gap-2 items-center">
            <FaDog />
            {housing.housing_pets ? housing.housing_pets_description : 0}
          </div>
        )}
      </div>
      <div className="flex justify-around mt-2">
        {housing.housing_when_leave_text && (
          <div className="flex gap-2 items-center">
            <FaClock />
          </div>
        )}
        {housing.housing_when_leave_text && (
          <div className="flex gap-2 items-center">
            <FaMap />
          </div>
        )}
      </div>
    </div>
  )
}
