import React, { useState } from "react"
import { TicketType, TicketTypeSwitcher } from "./TicketTypeSwitcher"
import { TicketTypeOffer } from "./TicketTypeOffer"
import { useTranslations } from "../../hooks/translations"
import { useRouter } from "next/router"
import { FormNeedTransport } from "./FormNeedTransport"
import { TagConstIds } from "../../services/types.tag"
import { RouteDefinitions } from "../../utils/routes"
import { FaHandsHelping, FaHandHoldingHeart } from "react-icons/fa"

// const ticketService = getRootContainer().containers.ticketService

export const AddTicketForm = () => {
  const router = useRouter()
  const i18n = useTranslations()

  const [ticketType, setTicketType] = useState<
    TicketType.Offer | TicketType.Need | undefined
  >(undefined)

  const [tag, setTag] = useState<TagConstIds | undefined | null>(undefined)

  const typeSwitcherOpts = {
    optionOne: {
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
    optionTwo: {
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
  }

  const needSwitcherOpts = {
    optionOne: {
      name: i18n.addTicket.wizard.formNameTransport,
      active: tag === TagConstIds.transport,
      onClick: () => setTag(TagConstIds.transport),
    },
    optionTwo: {
      name: i18n.addTicket.wizard.formNameOther,
      active: tag === null,
      onClick: () => {
        router.push(RouteDefinitions.AddTicketOld)
      },
    },
  }

  // const showTransportLocationSection = tag === TagConstIds.transport

  return (
    <div className="bg-white shadow max-w-2xl mx-auto">
      <div className="p-4">
        <TicketTypeSwitcher opts={typeSwitcherOpts} />

        {ticketType === TicketType.Need && (
          <TicketTypeSwitcher opts={needSwitcherOpts} />
        )}
        {ticketType === TicketType.Offer && <TicketTypeOffer />}

        {ticketType === TicketType.Need && tag === TagConstIds.transport && (
          <FormNeedTransport />
        )}
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
