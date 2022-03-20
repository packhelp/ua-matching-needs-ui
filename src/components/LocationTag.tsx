import React from "react"
import Color from "color"

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
      className={`flex-shrink-0 inline-block px-4 py-2 text-xs font-medium rounded-full mr-1 my-1 ${
        className ? className : ""
      }`}
      style={active ? activeStyles : inactiveStyles}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
