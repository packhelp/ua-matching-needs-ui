import { useState, useMemo } from "react"
import {
  Container,
} from "@chakra-ui/react"
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
import { TransportLocationSection } from "./TransportLocationSection"

const ticketService = getRootContainer().containers.ticketService

export const AddTicketForm = () => {
  const translation = useTranslations()
  const { getTranslation } = useTagTranslation()
  const { locale } = useRouter()

  const [ticketType, setTicketType] = useState<TicketType.Offer | TicketType.Need | undefined>(undefined)
  const [selectedMainCategory, setSelectedMainCategory] = useState(undefined)

  const { data: tags = []} = useQuery(`main-tags`, () => {
    return ticketService.mainTags()
  })

  const useFormOptions: any = {}
  const { register, handleSubmit } = useForm<TicketFormData>(useFormOptions)

  const submit = async () => {
    console.log("poszło")
  }

  const mappedCategoryTags = useMemo(() => {
    return tags.map((tag) => ({
      value: tag.id,
      label: getTranslation(tag),
    }))
  }, [tags, locale])

  console.log(selectedMainCategory)

  const showTransportLocationSection = selectedMainCategory.value === 5 /// transport

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <TicketTypeSwitcher
          setType={setTicketType}
          selectedType={ticketType}
        />
        {ticketType === TicketType.Need && (
          <form onSubmit={handleSubmit(submit)}>
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
            {showTransportLocationSection && <TransportLocationSection />}
          </form>
        )}
        {ticketType === TicketType.Offer && (
          <TicketTypeOffer />
        )}
      </Container>
    </div>
  )
}