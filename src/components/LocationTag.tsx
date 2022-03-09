import React from "react"
import { NeedTagType } from "../services/ticket.type"
import { useTagTranslation } from "../hooks/useTagTranslation"
import { propNames } from "@chakra-ui/react"
const Color = require("color")

const TagCOPY = ({
  tag,
  onClick,
  active = true,
  className,
  children,
}: {
  tag: Partial<NeedTagType>
  onClick?: (tagId: number | undefined) => void
  active?: boolean
  className?: string
  children: React.ReactNode
}) => {
  const { getTranslation } = useTagTranslation()

  return <LocationTagHtml>{children}</LocationTagHtml>
}

export const LocationTagHtml = ({
  onClick,
  bgColor,
  active = true,
  className,
  children,
}: {
  bgColor?: string
  onClick?: () => any
  active?: boolean
  className?: string
  children: React.ReactNode
}) => {
  const backgroundColor = Color(bgColor || "#f2c94c")
  const lightness = backgroundColor.isLight() ? 10 : 90
  const foregroundColor = backgroundColor.lightness(lightness)

  const inactiveStyles = {
    borderColor: backgroundColor.hex(),
    color: foregroundColor.hex(),
  }

  const activeStyles = {
    backgroundColor: backgroundColor.hex(),
    color: foregroundColor.hex(),
  }

  return (
    <span
      className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full mr-1 my-1 ${
        className ? className : ""
      }`}
      style={active ? activeStyles : inactiveStyles}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
