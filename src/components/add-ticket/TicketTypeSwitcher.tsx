import React from "react"

type Option = {
  name: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
}

type TicketTypeSwitcherProps = {
  opts: Option[]
}

export const TicketTypeSwitcher = (props: TicketTypeSwitcherProps) => {
  const { opts } = props

  return (
    <div className="flex justify-between cursor-pointer mb-4 text-center">
      {opts.map((option) => {
        return (
          <div
            onClick={option.onClick}
            className={`${
              option.active && "bg-blue-500 text-white"
            } border-r-0 flex-col w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {option.icon && <div className="mb-2">{option.icon}</div>}
            <span>{option.name}</span>
          </div>
        )
      })}
    </div>
  )
}
