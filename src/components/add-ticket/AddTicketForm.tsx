import { useState, useMemo } from "react"
import { Button, Container } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { TicketFormData } from "../../services/ticket.type"
import { TicketTypeSwitcher, TicketType } from "./TicketTypeSwitcher"
import { TicketTypeOffer } from "./TicketTypeOffer"
import { useQuery } from "react-query"
import { getRootContainer } from "../../services/_root-container"
import Select, { SingleValue } from "react-select"
import { useTranslations } from "../../hooks/translations"
import { useTagTranslation } from "../../hooks/useTagTranslation"
import { useRouter } from "next/router"
import { FormNeedTransport } from "./FormNeedTransport"
import { NeedCategorySwitcher } from "./NeedCategorySwitcher"
import { TagConstIds } from "../../services/types.tag"
import { RouteDefinitions } from "../../utils/routes"

// const ticketService = getRootContainer().containers.ticketService

export const AddTicketForm = () => {
  const router = useRouter()
  const i18n = useTranslations().addTicket

  const [ticketType, setTicketType] = useState<
    TicketType.Offer | TicketType.Need | undefined
  >(undefined)

  const [tag, setTag] = useState<TagConstIds | undefined | null>(undefined)

  const opts = {
    transport: {
      name: i18n.wizard.formNameTransport,
      active: tag === TagConstIds.transport,
      onClick: () => setTag(TagConstIds.transport),
    },
    other: {
      name: i18n.wizard.formNameOther,
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
        <TicketTypeSwitcher setType={setTicketType} selectedType={ticketType} />
        <br />

        {ticketType === TicketType.Need && (
          <div className="my-8">
            <NeedCategorySwitcher {...opts} />
          </div>
        )}
        {ticketType === TicketType.Offer && <TicketTypeOffer />}

        {/* NEED TRANSPORT FORM */}
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
