import React from "react"
const Color = require("color")
import { useTagTranslation } from "../../pages/tickets/add"

export const Tag = ({
  tag,
  onClick,
  active = true,
  className,
}: {
  tag: {
    id: number
    name: string
    background_color?: string
  }
  onClick?: (tagId: number) => void
  active?: boolean
  className?: string
}) => {
  const { getTranslation } = useTagTranslation()

  const backgroundColor = Color(tag.background_color || "#f2c94c")
  const lightness = backgroundColor.isLight() ? 20 : 80
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
      className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-1 mr-1 ${
        className ? className : ""
      }`}
      style={active ? activeStyles : inactiveStyles}
      onClick={onClickTag}
    >
      {getTranslation(tag)}
    </span>
  )
}
