import React from "react"
const Color = require("color")

export const Tag = ({
  tag,
}: {
  tag: {
    id: number
    name: string
    background_color?: string
  }
}) => {
  const backgroundColor = Color(tag.background_color || "#f2c94c")
  const lightness = backgroundColor.isLight() ? 20 : 80
  const foregroundColor = backgroundColor.lightness(lightness)

  return (
    <span
      key={tag.id}
      className="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full"
      style={{
        backgroundColor: backgroundColor.hex(),
        color: foregroundColor.hex(),
      }}
    >
      {tag.name}
    </span>
  )
}
