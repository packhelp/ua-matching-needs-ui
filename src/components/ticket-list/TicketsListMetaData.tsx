import Head from "next/head"
import React, { useMemo } from "react"
import truncate from "truncate"
import { useTranslations } from "../../hooks/translations"
import { NeedTagType } from "../../services/ticket.type"
import { useTagTranslation } from "../../hooks/useTagTranslation"

type MetaDataProps = {
  tag?: NeedTagType
  ticketsListTitle: string
}

export const TicketsListMetaData = (props: MetaDataProps) => {
  const { tag, ticketsListTitle } = props
  const translations = useTranslations()
  const { getTranslation } = useTagTranslation()

  const metaTitle = useMemo(() => {
    const defaultTitle = `${ticketsListTitle} - ${translations.metaData.title}`
    if (!tag) {
      // default
      return defaultTitle
    }

    const title = `${getTranslation(tag)} - ${translations.metaData.title}`

    return truncate(title, 60)
  }, [tag, ticketsListTitle])

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta property="og:title" content={metaTitle} key="og-title" />
    </Head>
  )
}
