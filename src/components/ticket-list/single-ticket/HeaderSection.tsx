import React from "react"
import { Tooltip } from "@chakra-ui/react"
import { Tag } from "../../Tag"
import { Hand } from "../../hero-icons/Hand"
import { Organization } from "../../hero-icons/Organization"
import { useTranslations } from "../../../hooks/translations"

export const HeaderSection = ({ need }) => {
  const translations = useTranslations()
  return (
    <>
      <div className="mb-2 flex justify-between">
        <div className="flex items-center max-w-2xl mb-1 text-sm text-gray-400 space-x-1">
          {need.requester.verified ? (
            <>
              <Tooltip label={translations.pages.ticket.verifiedOrganisation}>
                <Organization />
              </Tooltip>
              <span className="ticket-item__number pr-1 text-blue-400 font-medium">
                #{need.id}
              </span>
            </>
          ) : (
            <span className="pr-1 my-1 font-medium">#{need.id}</span>
          )}
          <span className="">
            {need.tags.map((tag) => {
              // TODO: move to ticket class
              if (!tag || !tag.need_tag_id || !tag.need_tag_id.id) {
                return null
              }

              return <Tag key={tag.need_tag_id.id} tag={tag.need_tag_id} />
            })}
          </span>
        </div>
        <div>
          <span className="inline-flex">
            <Hand em="1.2em" /> {need.responsesLength}
          </span>
        </div>
      </div>
    </>
  )
}
