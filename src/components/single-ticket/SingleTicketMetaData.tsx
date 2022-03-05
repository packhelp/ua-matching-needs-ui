import Head from "next/head"
import React, { useMemo } from "react"
import truncate from "truncate"
import { useTranslations } from "../../hooks/translations"
import { useFinalLocale } from "../../hooks/final-locale"
import { TicketDetailsType } from "../../services/ticket.type"

type MetaDataProps = {
  ticket: TicketDetailsType
}

export const SingleTicketMetaData = (props: MetaDataProps) => {
  const { ticket } = props
  const translations = useTranslations()
  const finalLocale = useFinalLocale()

  const metaTitle = useMemo(() => {
    if (!ticket) {
      // default
      return translations.metaData.title
    }

    const title =
      ticket.what || ticket.description || translations.metaData.title
    const hasTags = ticket.need_tag_id && ticket.need_tag_id.length > 0

    if (hasTags) {
      const firstTag = ticket.need_tag_id[0].need_tag_id.name
      return truncate(`${firstTag}: ${title}`, 60)
    }

    const i18n = translations["pages"]["ticket"]["metaTitle"]
    return truncate(`${i18n["need"]}: ${title}`, 60)
  }, [ticket, finalLocale])

  const metaDescription = useMemo(() => {
    if (!ticket) {
      return translations.metaData.description
    }

    const description = ticket.where
      ? `📍 ${ticket.where}`
      : translations.metaData.description

    return truncate(description, 100)
  }, [ticket])

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta property="og:title" content={metaTitle} key="og-title" />
      <meta
        property="description"
        content={metaDescription}
        key="description"
      />
      <meta
        property="og:description"
        content={metaDescription}
        key="og-description"
      />
    </Head>
  )
}
