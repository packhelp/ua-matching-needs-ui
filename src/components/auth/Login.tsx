import { Button, FormLabel, Heading, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { FC, useCallback, useMemo, useState } from "react"
import { getUserInfo, signIn } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { Locales, translations } from "../../utils/translations"

export const Login: FC = () => {
  const router = useRouter()
  const isLogged = getUserInfo()

  const [phone, setPhone] = useState<string | undefined>()

  let finalLocale: Locales = "pl-PL"
  if (router.locale != null) {
    finalLocale = router.locale as any as Locales
  }

  if (typeof window !== "undefined" && isLogged) {
    router.push(RouteDefinitions.AddTicket)
  }

  const canSubmit = useMemo(() => phone && phone !== "", [phone])

  const submitForm = useCallback(() => {
    if (!canSubmit) return

    signIn(phone as string)
    router.push(RouteDefinitions.AddTicket)
  }, [canSubmit, phone])

  return (
    <>
      <form onSubmit={submitForm}>
        <Heading as="h1" size="1xl" mb={4}>
          {translations[finalLocale]["pages"]["sign-in"]["title"]}
        </Heading>

        <FormLabel>
          {translations[finalLocale]["pages"]["sign-in"]["label"]}
        </FormLabel>
        <Input
          placeholder={
            translations[finalLocale]["pages"]["sign-in"]["placeholder"]
          }
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button
          type="submit"
          mt={2}
          colorScheme="blue"
          isFullWidth
          disabled={!canSubmit}
        >
          {translations[finalLocale]["pages"]["sign-in"]["next"]}
        </Button>
      </form>
    </>
  )
}
