import { useTranslations } from "../../hooks/translations"

export enum TicketType {
  Offer = "offer",
  Need = "need",
}

type TicketTypeSwitcherProps = {
  setType: (type: TicketType.Need | TicketType.Offer) => void
  selectedType: TicketType.Need | TicketType.Offer | undefined
}

export const TicketTypeSwitcher = (props: TicketTypeSwitcherProps) => {
  const { setType, selectedType } = props
  const i18n = useTranslations().addTicket.wizard

  const isOffer = selectedType === TicketType.Offer
  const isNeed = selectedType === TicketType.Need

  return (
    <div className="flex justify-between cursor-pointer">
      <div
        onClick={() => setType(TicketType.Need)}
        className={`${
          isNeed
            ? "border border-transparent bg-blue-500 shadow-sm hover:bg-blue-600 text-white"
            : "border border-blue-500 text-black"
        } w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{i18n.iNeedHelp}</span>
      </div>
      <div className="w-16" />
      <div
        onClick={() => setType(TicketType.Offer)}
        className={`${
          isOffer
            ? "border border-transparent bg-amber-300 shadow-sm hover:bg-amber-400 text-black"
            : "border border-amber-300 text-black"
        } w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{i18n.iCanHelp}</span>
      </div>
    </div>
  )
}
