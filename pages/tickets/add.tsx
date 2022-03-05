import {
  Box,
  Checkbox,
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
import { useRouter } from "next/router"
import { RouteDefinitions } from "../../src/utils/routes"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { useTranslations } from "../../src/hooks/translations"
import { useState } from "react"
import { PlusSVG } from "../../src/assets/styled-svgs/plus"
import { isJsonString } from "../../src/utils/local-storage"
import { useSession } from "next-auth/react"
import {
  TicketPostData,
  TicketFormData,
  NeedTagType,
} from "../../src/services/ticket.type"
import { useTagTranslation } from "../../src/hooks/useTagTranslation"
import { getRootContainer } from "../../src/services/_root-container"

export const LOCAL_STORAGE_KEY_TICKET_DATA = "ticket_data"
export const LOCAL_STORAGE_KEY_TAGS = "tags"

const saveNeedInfoToLocalStorage = (
  data: TicketFormData,
  tagsSelected: number[]
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_TICKET_DATA, JSON.stringify(data))
  localStorage.setItem(LOCAL_STORAGE_KEY_TAGS, JSON.stringify(tagsSelected))
}

const getInitialDataFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return
  }

  const data = localStorage.getItem(LOCAL_STORAGE_KEY_TICKET_DATA)

  if (isJsonString(data)) {
    return JSON.parse(data)
  }
}

const TagsChooseForm = (props: {
  tags: NeedTagType[]
  tagsSelected: number[] | number | undefined
  onClickTag: (tagId: number) => void
}) => {
  const { getTranslation } = useTagTranslation()

  function isTagIdSelected(tagId: number): boolean {
    if (props.tagsSelected === tagId) return true
    if (props.tagsSelected && typeof props.tagsSelected !== "number") {
      return props.tagsSelected && props.tagsSelected.includes(tagId)
    }
    return false
  }

  return (
    <Box>
      {props.tags.map((tag) => {
        return (
          <Tag
            key={tag.id}
            mr={2}
            mb={2}
            variant={isTagIdSelected(tag.id) ? "solid" : "outline"}
            onClick={() => props.onClickTag(tag.id)}
            className={"cursor-pointer "}
            colorScheme={"blue"}
          >
            {getTranslation(tag)}
          </Tag>
        )
      })}
    </Box>
  )
}

const getPreviouslySavedTags = () => {
  if (typeof window !== "undefined") {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY_TAGS)
    if (isJsonString(json)) {
      return JSON.parse(json)
    }
  }

  return []
}
const ticketService = getRootContainer().containers.ticketService
const AddTicket: NextPage = () => {
  const router = useRouter()
  const translations = useTranslations()
  const previouslySavedTags = getPreviouslySavedTags()
  const { data: authSession, status: authStatus } = useSession()
  const [tagsSelected, setTagsSelected] =
    useState<number[]>(previouslySavedTags)

  const [whereFromTag, setWhereFromTag] = useState<number | undefined>(
    undefined
  )
  const [whereToTag, setWhereToTag] = useState<number | undefined>(undefined)

  const { data: tags } = useQuery(`main-tags`, () => {
    return ticketService.mainTags()
  })
  const { data: locationTags } = useQuery(`location-tags`, () => {
    return ticketService.locationTags()
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
      const {
        phone,
        what,
        where,
        who,
        count,
        need_tag_id,
        phone_public,
        adults,
        children,
        has_pets,
      } = newTicket
      const expirationTimestampSane = dayjs().add(24, "hour").format()

      let newTicketData = {
        phone,
        description: what,
        what,
        where,
        who,
        // @deprecated - I've set to 0, because it was fetched from my localStorage from the days when it was used.
        // Now it is not, but if it is set, it will be shown in ticket details view, so we don't want to set it.
        count: 0,
        expirationTimestampSane,
        phone_public,
        need_tag_id,

        // The problem that might arise is that we store data in localStorage,
        // so if we hide it somehow on the form, it might be pulled from localStorage anyway
        // so make sure it works correctly.
        adults: adults ? adults : 0,
        children: children ? children : 0,
        has_pets,
      }
      // if trip
      if (whereFromTag || whereToTag) {
        newTicketData = Object.assign(newTicketData, {
          need_type: "trip",
          where_from_tag: whereFromTag,
          where_to_tag: whereToTag,
        })
      }

      return axios.post(`/api/add-ticket`, newTicketData)
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

  if (!tags || !locationTags) return null

  const submitNeed = async (data: TicketFormData) => {
    if (authStatus === "unauthenticated" || !authSession?.user) {
      toast.error(translations["pages"]["auth"]["you-have-been-logged-out"])
      return router.push(RouteDefinitions.SignIn)
    }

    saveNeedInfoToLocalStorage(data, tagsSelected)

    const tagsData = tagsSelected.map((tag) => {
      return { need_tag_id: { id: tag } }
    })

    const postData: TicketPostData = {
      ...data,
      phone: authSession.phoneNumber,
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
            <Heading as="h3" size="xl">
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
                {translations["pages"]["add-ticket"]["adults"]}
              </Heading>
              <Input
                min={0}
                type={"number"}
                placeholder={translations["pages"]["add-ticket"]["adults-hint"]}
                variant={"outline"}
                {...register("adults")}
              />
            </Stack>

            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"].whereFrom}
              </Heading>
              <TagsChooseForm
                tags={locationTags || []}
                onClickTag={(id) => setWhereFromTag(id)}
                tagsSelected={whereFromTag}
              />
            </Stack>

            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"].whereTo}
              </Heading>
              <TagsChooseForm
                tags={locationTags || []}
                onClickTag={(id) => setWhereToTag(id)}
                tagsSelected={whereToTag}
              />
            </Stack>

            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"]["children"]}
              </Heading>
              <Input
                min={0}
                type={"number"}
                placeholder={
                  translations["pages"]["add-ticket"]["children-hint"]
                }
                variant={"outline"}
                {...register("children")}
              />
            </Stack>

            <Checkbox
              value={1}
              defaultChecked={false}
              {...register("has_pets")}
            >
              {translations["pages"]["add-ticket"]["has-pets"]}
            </Checkbox>

            <Stack>
              <Heading as={"h2"} size={"l"}>
                {translations["pages"]["add-ticket"]["what-do-you-need"]}
              </Heading>
              <Textarea
                rows={6}
                placeholder={
                  translations["pages"]["add-ticket"]["what-do-you-need-hint"]
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

            <Checkbox
              value={1}
              defaultChecked={true}
              {...register("phone_public")}
            >
              {translations["pages"]["add-ticket"].show_phone_public}
            </Checkbox>

            <button
              type="submit"
              disabled={addTicketMutation.isLoading}
              className="w-full relative inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-amber-300 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSVG />
              <span>{translations["/tickets/add"]}</span>
            </button>
          </Stack>
        </form>
      </Container>
    </div>
  )
}

export default AddTicket
