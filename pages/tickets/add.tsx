import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import axios from "axios"
import { getUserInfo } from "../../src/services/auth"
import { useRouter } from "next/router"
import { RouteDefinitions } from "../../src/utils/routes"
import { toast } from "react-toastify"

export const LOCAL_STORAGE_KEY_TICKET_DATA = "ticket_data"
export const LOCAL_STORAGE_KEY_ALL_TICKETS = "all_tickets"

export type TicketFormData = {
  what?: string
  count?: number
  where?: string
  who?: string
}

export type TicketPostData = TicketFormData & {
  phone: string
}

export enum TICKET_STATUS {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
}

export type TicketData = TicketFormData & {
  id: number
  expirationTimestamp: number
  status: TICKET_STATUS
}

export type TicketDetails = TicketPostData & TicketData

const saveForFurtherUsage = (data: TicketFormData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_TICKET_DATA, JSON.stringify(data))
}

const getInitialDataFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return
  }

  const data = localStorage.getItem(LOCAL_STORAGE_KEY_TICKET_DATA)

  if (data) {
    return JSON.parse(data)
  }
}

const AddTicket: NextPage = () => {
  const router = useRouter()

  const onSuccess = (rawResponse) => {
    const { data } = rawResponse.data
    const id = data.id

    toast.success("Zgłoszono potrzebę!")

    setTimeout(() => {
      return router.push(
        RouteDefinitions.TicketDetails.replace(":id", String(id))
      )
    }, 1000)
  }

  const addTicketMutation = useMutation<TicketPostData, Error, TicketPostData>(
    (newTicket) => {
      const { phone, what, where, who, count } = newTicket
      const now = new Date()
      const expirationTimestamp = now.setHours(now.getHours() + 3)

      const newTicketData = {
        phone,
        description: what,
        what,
        where,
        who,
        count: count ? count : 0,
        expirationTimestamp,
        phone_public: true,
      }

      return axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need`,
        newTicketData
      )
    },
    {
      onSuccess,
    }
  )

  const savedTicketFormData = getInitialDataFromLocalStorage()
  const useFormOptions: any = {}

  if (savedTicketFormData) {
    useFormOptions.defaultValues = savedTicketFormData
  }
  const { register, handleSubmit } = useForm<TicketFormData>(useFormOptions)

  const submitNeed = async (data: TicketFormData) => {
    const userInfo = getUserInfo()
    if (!userInfo) {
      toast.error("Zostałeś wylogowany")
      return router.push(RouteDefinitions.SignIn)
    }

    saveForFurtherUsage(data)

    const postData: TicketPostData = { ...data, phone: userInfo.phone }
    addTicketMutation.mutate(postData)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submitNeed)}>
        <Stack>
          <Heading as="h1" size="xl">
            Dodaj potrzebę
          </Heading>

          <Stack>
            <Heading as={"h2"} size={"l"}>
              Czego potrzebujesz?
            </Heading>
            <Textarea
              rows={6}
              placeholder="Czego potrzebujesz?"
              variant={"outline"}
              {...register("what")}
            />
          </Stack>
          <Stack>
            <Heading as={"h2"} size={"l"}>
              Ile potrzebujesz?
            </Heading>
            <Input
              placeholder="W sztukach, jeśli dotyczy"
              variant={"outline"}
              {...register("count")}
            />
          </Stack>
          <Stack>
            <Heading as={"h2"} size={"l"}>
              Gdzie to potrzebujesz dostarczyć?
            </Heading>
            <Textarea
              placeholder="Adres lub lokalizacja GPS"
              variant={"outline"}
              {...register("where")}
            />
          </Stack>
          <Stack>
            <Heading as={"h2"} size={"l"}>
              Kto to potrzebuje?
            </Heading>
            <Text fontSize={"sm"}>
              Twoje imię i nazwisko lub Twoja nazwa organizacji
            </Text>
            <Textarea
              placeholder="Kto to potrzebuje?"
              variant={"outline"}
              {...register("who")}
            />
          </Stack>

          {addTicketMutation.isError ? (
            <Text color={"red"}>
              Wystąpił błąd podczas dodawania: {addTicketMutation.error.message}
            </Text>
          ) : null}

          {addTicketMutation.isSuccess ? (
            <Text>Zgłoszenie przyjęte!</Text>
          ) : null}

          <Button
            disabled={addTicketMutation.isLoading}
            colorScheme="blue"
            type={"submit"}
          >
            Dodaj potrzebę
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default AddTicket
