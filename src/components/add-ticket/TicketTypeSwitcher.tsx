import { useTranslations } from "../../hooks/translations"

export enum TicketType {
  Offer = "offer",
  Need = "need",
}

type TicketTypeSwitcherProps = {
  setType: (type: TicketType.Need | TicketType.Offer) => void
  selectedType: TicketType.Need | TicketType.Offer | undefined
}

// should be changed to .map to handle more opts
export const TicketTypeSwitcher = (props: any) => {
  const { opts } = props
  const { optionOne, optionTwo } = opts

  return (
    <div className="flex justify-between cursor-pointer mb-4 text-center">
      <div
        onClick={optionOne.onClick}
        className={`${optionOne.active && "border-b-2 border-blue-500 text-black"} w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{optionOne.name}</span>
      </div>
      <div
        onClick={optionTwo.onClick}
        className={`${optionTwo.active && "border-b-2 border-blue-500 text-black"} w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{optionTwo.name}</span>
      </div>
    </div>
  )
}
