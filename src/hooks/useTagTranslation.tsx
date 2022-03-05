import { useRouter } from "next/router"
import { NeedTagType } from "../services/ticket.type"

export const useTagTranslation = () => {
  const { locale } = useRouter()

  const getTranslation = (tag: Partial<NeedTagType>) => {
    if (!locale) {
      return tag.name
    }

    const localeForDirectus = locale.replace("-", "_")
    const translationField = `translation_${localeForDirectus}`

    const translation = tag[translationField]
    if (translation && translation.length > 0) {
      return translation
    }

    return tag.name
  }

  return { getTranslation }
}
