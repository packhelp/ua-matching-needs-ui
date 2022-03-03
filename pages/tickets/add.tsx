import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import axios from "axios"
import { getUserInfo } from "../../src/services/auth"
import { useRouter } from "next/router"
import { RouteDefinitions } from "../../src/utils/routes"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { useTranslations } from "../../src/hooks/translations"
import { isTicketActive } from "../ticket/[id]"
import { useState } from "react"
import { AddTicketButton } from "../../src/components/AddTicketButton"
import { getMainTags } from "../../src/utils/tags"

export const LOCAL_STORAGE_KEY_TICKET_DATA = "ticket_data"
export const LOCAL_STORAGE_KEY_ALL_TICKETS = "all_tickets"
export const LOCAL_STORAGE_KEY_TAGS = "tags"

export type NeedTagType = {
  id: number
  name: string
}

export type TicketFormData = {
  what?: string
  count?: number
  where?: string
  who?: string
}

export type TicketPostData = TicketFormData & {
  phone: string
  need_tag_id: {
    need_tag_id: Partial<NeedTagType>
  }[]
}

export enum TICKET_STATUS {
  ACTIVE = "ACTIVE",
  SOLVED = "SOLVED",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
  CANCELED = "CANCELED",
  HIDDEN = "HIDDEN",
}

export type Organization = {
  id: number
  name: string
}

export type TicketData = TicketFormData & {
  id: number
  // @deprecated - use expirationTimestampSane instead
  expirationTimestamp: number
  expirationTimestampSane: string
  date_created: number
  ticket_status: TICKET_STATUS
  organization_id?: Organization
  description: string
  need_tag_id: {
    need_tag_id: NeedTagType
  }[]
  visits: number
}

export type TicketDetails = TicketPostData & TicketData

const saveForFurtherUsage = (data: TicketFormData, tagsSelected: number[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_TICKET_DATA, JSON.stringify(data))
  localStorage.setItem(LOCAL_STORAGE_KEY_TAGS, JSON.stringify(tagsSelected))
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

const TagsChooseForm = (props: {
  tags: NeedTagType[]
  tagsSelected: number[]
  onClickTag: (tagId: number) => void
}) => (
  <Box>
    {props.tags.map((tag) => (
      <Tag
        key={tag.id}
        mr={2}
        mb={2}
        variant={props.tagsSelected.includes(tag.id) ? "solid" : "outline"}
        onClick={() => props.onClickTag(tag.id)}
        className={"cursor-pointer "}
        colorScheme={"blue"}
      >
        {tag.name}
      </Tag>
    ))}
  </Box>
)

const getPreviouslySavedTags = () => {
  if (typeof window !== "undefined") {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY_TAGS)
    if (json) {
      return JSON.parse(json)
    }
  }

  return []
}

const AddTicket: NextPage = () => {
  const router = useRouter()
  const translations = useTranslations()
  const previouslySavedTags = getPreviouslySavedTags()
  const [tagsSelected, setTagsSelected] =
    useState<number[]>(previouslySavedTags)

  const { data: tags } = useQuery(`main-tags`, () => {
    return getMainTags()
  })

  const onSuccess = (rawResponse) => {
    const { data } = rawResponse.data
    const id = data.id

    toast.success(translations["pages"]["add-ticket"]["need-added"])

    setTimeout(() => {
      return router.push(
        RouteDefinitions.TicketDetails.replace(":id", String(id))
      )
    }, 1000)
  }

  const addTicketMutation = useMutation<TicketPostData, Error, TicketPostData>(
    (newTicket) => {
      const { phone, what, where, who, count, need_tag_id } = newTicket
      const now = new Date()
      // @deprecated
      const expirationTimestamp = now.setHours(now.getHours() + 3)
      const expirationTimestampSane = dayjs().add(24, "hour").format()

      const newTicketData = {
        phone,
        description: what,
        what,
        where,
        who,
        count: count ? count : 0,
        // @deprecated
        expirationTimestamp,
        expirationTimestampSane,
        phone_public: true,
        need_tag_id,
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
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    saveForFurtherUsage(data, tagsSelected)

    const tagsData = tagsSelected.map((tag) => {
      return { need_tag_id: { id: tag } }
    })

    const postData: TicketPostData = {
      ...data,
      phone: userInfo.phone,
      need_tag_id: tagsData,
    }
    addTicketMutation.mutate(postData)
  }

  const toggleTag = (tagId: number) => {
    if (tagsSelected.includes(tagId)) {
      setTagsSelected(tagsSelected.filter((id) => id !== tagId))
    } else {
      setTagsSelected([...tagsSelected, tagId])
    }
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit(submitNeed)}>
          <Stack>
            <Heading as="h1" size="xl">
              {translations["pages"]["add-ticket"]["add-need"]}
            </Heading>

            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"]["tags"]}
              </Heading>

              <TagsChooseForm
                tags={tags || []}
                onClickTag={toggleTag}
                tagsSelected={tagsSelected}
              />
            </Stack>
            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"]["what-do-you-need"]}
              </Heading>
              <Textarea
                rows={6}
                placeholder={
                  translations["pages"]["add-ticket"]["what-do-you-need"]
                }
                variant={"outline"}
                {...register("what")}
              />
            </Stack>
            <Stack>
              <Heading as={"h2"} size={"l"}>
                {
                  translations["pages"]["add-ticket"][
                    "where-do-you-need-it-delivered"
                  ]
                }
              </Heading>
              <Textarea
                placeholder={
                  translations["pages"]["add-ticket"]["address-or-gps"]
                }
                variant={"outline"}
                {...register("where")}
              />
            </Stack>
            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"]["who-needs-it"]}
              </Heading>
              <Text fontSize={"sm"}>
                {
                  translations["pages"]["add-ticket"][
                    "name-surname-or-org-name"
                  ]
                }
              </Text>
              <Textarea
                placeholder={
                  translations["pages"]["add-ticket"]["who-needs-it"]
                }
                variant={"outline"}
                {...register("who")}
              />
            </Stack>

            {addTicketMutation.isError ? (
              <Text color={"red"}>
                {translations["errors"]["error-occured-while-adding"]}
                {addTicketMutation.error.message}
              </Text>
            ) : null}

            {addTicketMutation.isSuccess ? (
              <Text>
                {translations["pages"]["add-ticket"]["request-added"]}
              </Text>
            ) : null}

            <Box
              as="button"
              type="submit"
              disabled={addTicketMutation.isLoading}
            >
              <AddTicketButton />
            </Box>
          </Stack>
        </form>
      </Container>
    </div>
  )
}

export default AddTicket
