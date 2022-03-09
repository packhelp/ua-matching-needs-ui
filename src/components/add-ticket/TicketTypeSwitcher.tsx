import React from "react"

export enum TicketType {
  Offer = "offer",
  Need = "need",
}

type Option = {
  name: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
}

type TicketTypeSwitcherProps = {
  opts: {
    optionOne: Option
    optionTwo: Option
  }
}

// should be changed to [] to handle more opts
export const TicketTypeSwitcher = (props: TicketTypeSwitcherProps) => {
  const { opts } = props
  const { optionOne, optionTwo } = opts

  return (
    <div className="flex justify-between cursor-pointer mb-4 text-center">
      <div
        onClick={optionOne.onClick}
        className={`${
          optionOne.active && "bg-blue-500 text-white"
        } border-r-0 flex-col w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {optionOne.icon && <div className="mb-2">{optionOne.icon}</div>}
        <span>{optionOne.name}</span>
      </div>
      <div
        onClick={optionTwo.onClick}
        className={`${
          optionTwo.active && "bg-blue-500 text-white"
        } flex-col w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {optionTwo.icon && <div className="mb-2">{optionTwo.icon}</div>}
        <span>{optionTwo.name}</span>
      </div>
    </div>
  )
}
