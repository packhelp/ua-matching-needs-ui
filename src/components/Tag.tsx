import React from "react"
import { NeedTagType } from "../services/ticket.type"
import { useTagTranslation } from "../hooks/useTagTranslation"
const Color = require("color")

export const Tag = ({
  tag,
  onClick,
  active = true,
  className,
}: {
  tag: Partial<NeedTagType>
  onClick?: (tagId: number | undefined) => void
  active?: boolean
  className?: string
}) => {
  const { getTranslation } = useTagTranslation()

  const backgroundColor = Color(tag.background_color || "#f2c94c")
  const lightness = backgroundColor.isLight() ? 10 : 90
  const foregroundColor = backgroundColor.lightness(lightness)

  const onClickTag = () => {
    if (onClick) {
      onClick(tag.id)
    }
  }

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
      key={tag.id}
      className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full mr-1 my-1 ${
        className ? className : ""
      }`}
      style={active ? activeStyles : inactiveStyles}
      onClick={onClickTag}
    >
      {getTranslation(tag)}
    </span>
  )
}
