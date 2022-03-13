import React from "react"
import { TiLocationOutline } from "react-icons/ti"

export const TitleSection = ({ need }) => {
  return (
    <div className="py-1">
      {!need.isTrip && (
        <p className="text-xl font-medium text-gray-900 truncate">
          {need.title}
        </p>
      )}

      {need.where && !need.isTrip ? (
        <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
          <TiLocationOutline />
          <span>{need.where}</span>
        </div>
      ) : (
        <div className="flex items-center text-sm font-medium text-gray-400 truncate space-x-1">
          {need.isTrip && <span className="w-5 h-5">{need.title}</span>}
        </div>
      )}
    </div>
  )
}
