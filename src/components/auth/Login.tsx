import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { FC } from "react"
import { Locales, translations } from "../../utils/translations"

export const Login: FC = () => {
  const { locale } = useRouter()

  let finalLocale: Locales = "pl-PL"
  if (locale != null) {
    finalLocale = locale as any as Locales
  }

  return (
    <>
      <Heading as="h1" size="1xl">
        {translations[finalLocale]["pages"]["sign-in"]["title"]}
      </Heading>
    </>
  )
}
