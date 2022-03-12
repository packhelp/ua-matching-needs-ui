import React, { useState } from "react"
import { TicketTypeSwitcher } from "./TicketTypeSwitcher"
import { TicketTypeOffer } from "./TicketTypeOffer"
import { useTranslations } from "../../hooks/translations"
import { useRouter } from "next/router"
import { FormNeedTransport } from "./forms/FormNeedTransport"
import { TagConstIds } from "../../services/types.tag"
import { RouteDefinitions } from "../../utils/routes"
import { FaHandsHelping, FaHandHoldingHeart } from "react-icons/fa"
import { FormNeedHousing } from "./forms/FormNeedHousing"

export enum TicketType {
  Offer = "offer",
  Need = "need",
}

// const ticketService = getRootContainer().containers.ticketService

export const AddTicketForm = () => {
  const router = useRouter()
  const i18n = useTranslations()

  const [ticketType, setTicketType] = useState<
    TicketType.Offer | TicketType.Need | undefined
  >(undefined)

  const [tag, setTag] = useState<TagConstIds | undefined | null>(undefined)

  const typeSwitcherOpts = [
    {
      name: i18n.addTicket.wizard.iNeedHelp,
      active: ticketType === TicketType.Need,
      onClick: () => setTicketType(TicketType.Need),
      icon: (
        <FaHandsHelping
          size={30}
          className={`${ticketType !== TicketType.Need && "fill-blue-500"}`}
        />
      ),
    },
    {
      name: i18n.addTicket.wizard.iCanHelp,
      active: ticketType === TicketType.Offer,
      onClick: () => setTicketType(TicketType.Offer),
      icon: (
        <FaHandHoldingHeart
          size={30}
          className={`${ticketType !== TicketType.Offer && "fill-blue-500"}`}
        />
      ),
    },
  ]

  const needSwitcherOpts = [
    {
      name: i18n.addTicket.wizard.formNameTransport,
      active: tag === TagConstIds.transport,
      onClick: () => setTag(TagConstIds.transport),
    },
    {
      name: i18n.addTicket.wizard.formNameHousing,
      active: tag === TagConstIds.housing,
      onClick: () => setTag(TagConstIds.housing),
    },
    {
      name: i18n.addTicket.wizard.formNameOther,
      active: tag === null,
      onClick: () => {
        router.push(RouteDefinitions.AddTicketOld)
      },
    },
  ]

  const isTicketTypeNeed = ticketType === TicketType.Need
  const isTicketTypeOffer = ticketType === TicketType.Offer

  const showTransportForm =
    ticketType === TicketType.Need && tag === TagConstIds.transport
  const showHousingForm =
    ticketType === TicketType.Need && tag === TagConstIds.housing

  return (
    <div className="bg-white shadow max-w-2xl mx-auto">
      <div className="p-4">
        <TicketTypeSwitcher opts={typeSwitcherOpts} />

        {isTicketTypeNeed && <TicketTypeSwitcher opts={needSwitcherOpts} />}

        {isTicketTypeOffer && <TicketTypeOffer />}

        {showTransportForm && <FormNeedTransport />}
        {showHousingForm && <FormNeedHousing />}
      </div>
    </div>
  )
}

/**


{ticketType === TicketType.Need && (
  // <form onSubmit={handleSubmit(submit)}>
  <div className="my-8">
    <Select
      options={mappedCategoryTags}
      onChange={(tag) => setSelectedMainCategory(tag)}
      placeholder={translation["filters"]["selectNeeds"]}
      value={selectedMainCategory}
      isClearable
      isSearchable={false}
    />
  </div>
  // </form>
)}


 */
