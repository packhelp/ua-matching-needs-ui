import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Locales } from "../src/utils/translations"
import React from "react"

const Home: NextPage = () => {
  const { locale } = useRouter()

  let finalLocale: Locales = "pl-PL"

  if (locale != null) {
    finalLocale = locale as any as Locales
  }

  return <>Matching Needs INIT</>
}

export default Home
