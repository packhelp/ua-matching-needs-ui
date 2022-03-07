import { useState } from "react"
import {
  Container,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { TicketFormData } from "../../services/ticket.type"
import { TicketTypeSwitcher, TicketType } from "./TicketTypeSwitcher"
import { TicketTypeOffer } from "./TicketTypeOffer"


export const AddTicketForm = () => {
  const [ticketType, setTicketType] = useState<TicketType.Offer | TicketType.Need | undefined>(undefined)

  const useFormOptions: any = {}
  const { register, handleSubmit } = useForm<TicketFormData>(useFormOptions)

  const submit = async () => {
    console.log("poszło")
  }

  console.log(ticketType)

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <TicketTypeSwitcher
          setType={setTicketType}
          selectedType={ticketType}
        />
        {ticketType === TicketType.Need && (
          <form onSubmit={handleSubmit(submit)}>
          </form>
        )}
        {ticketType === TicketType.Offer && (
          <TicketTypeOffer />
        )}
      </Container>
    </div>
  )
}