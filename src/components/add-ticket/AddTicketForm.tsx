import React, { useState } from "react"
import { Container } from "@chakra-ui/react"
import { TicketType, TicketTypeSwitcher } from "./TicketTypeSwitcher"
import { TicketTypeOffer } from "./TicketTypeOffer"
import { useTranslations } from "../../hooks/translations"
import { useRouter } from "next/router"
import { FormNeedTransport } from "./FormNeedTransport"
import { TagConstIds } from "../../services/types.tag"
import { RouteDefinitions } from "../../utils/routes"

// const ticketService = getRootContainer().containers.ticketService

export const AddTicketForm = () => {
  const router = useRouter()
  const i18n = useTranslations()

  const [ticketType, setTicketType] = useState<
    TicketType.Offer | TicketType.Need
  >(TicketType.Need)

  const [tag, setTag] = useState<TagConstIds | undefined | null>(undefined)

  const typeSwitcherOpts = {
    optionOne: {
      name: i18n.addTicket.wizard.iNeedHelp,
      active: ticketType === TicketType.Need,
      onClick: () => setTicketType(TicketType.Need)
    },
    optionTwo: {
      name: i18n.addTicket.wizard.iCanHelp,
      active: ticketType === TicketType.Offer,
      onClick: () => setTicketType(TicketType.Offer)
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
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="gap-4 px-4 py-5 sm:p-6">
        <TicketTypeSwitcher opts={typeSwitcherOpts} />

        {ticketType === TicketType.Need && (
          <>
            <h4 className="mb-4 text-center b-4 text-md font-semibold text-gray-900 dark:text-black">
              {i18n.filters.selectNeeds}
            </h4>
            <TicketTypeSwitcher opts={needSwitcherOpts} />
          </>
        )}

        {ticketType === TicketType.Offer && <TicketTypeOffer />}

        {ticketType === TicketType.Need && tag === TagConstIds.transport && (
          <FormNeedTransport />
        )}
      </Container>
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
