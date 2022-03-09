import React from "react"

type Option = {
  name: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
}

type TicketTypeSwitcherProps = {
  opts: Option[]
  isColumn?: boolean
}

export const TicketTypeSwitcher = (props: TicketTypeSwitcherProps) => {
  const { opts, isColumn } = props

  return (
    <div
      className={`${
        isColumn && "flex flex-col items-start"
      } flex justify-between cursor-pointer mb-4 text-center`}
    >
      {opts.map((option) => {
        return (
          <div
            key={option.name}
            onClick={option.onClick}
            className={`${
              option.active && "bg-blue-500 text-white"
            }  border-r-0 flex-col w-full relative inline-flex justify-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isColumn ? "items-start " : "items-center"
            }`}
          >
            {option.icon && <div className="mb-2">{option.icon}</div>}
            <span>{option.name}</span>
          </div>
        )
      })}
    </div>
  )
}
