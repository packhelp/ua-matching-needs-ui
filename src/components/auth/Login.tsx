import { Button, Container, FormLabel, Heading, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { FC, useCallback, useMemo, useState } from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { getUserInfo, signIn } from "../../services/auth"
import { RouteDefinitions } from "../../utils/routes"
import { translations } from "../../utils/translations"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"

export const Login: FC = () => {
  const router = useRouter()
  const isLogged = getUserInfo()
  const finalLocale = useFinalLocale()

  const [phone, setPhone] = useState<string | undefined>()
  const [shouldValidate, setShouldValidate] = useState<boolean>(false)

  // if (typeof window !== "undefined" && isLogged) {
  //   router.push(RouteDefinitions.AddTicket)
  // }

  const parsedPhone = useMemo(() => {
    return parsePhoneNumberFromString(phone || "", "PL")
  }, [phone])

  const isPhoneValid = useMemo(() => {
    if (!shouldValidate) {
      return true
    }
    return parsedPhone?.isValid()
  }, [shouldValidate, parsedPhone])

  const canSubmit = useMemo(
    () => phone && phone !== "" && isPhoneValid,
    [phone, isPhoneValid]
  )

  const phoneNumber = useMemo(() => {
    return parsedPhone?.number || phone
  }, [parsedPhone, phone])

  const submitForm = useCallback(() => {
    if (!canSubmit) return

    signIn(phoneNumber as string)
    router.push(RouteDefinitions.AddTicket)
  }, [canSubmit, phoneNumber])

  return (
    <Container>
      <form onSubmit={submitForm}>
        <Heading as="h1" size="1xl" mb={4}>
          {translations[finalLocale]["pages"]["sign-in"]["title"]}
        </Heading>

        <FormLabel>
          {translations[finalLocale]["pages"]["sign-in"]["label"]}
        </FormLabel>
        <Input
          name={"phone"}
          placeholder={
            translations[finalLocale]["pages"]["sign-in"]["placeholder"]
          }
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setShouldValidate(true)}
          isInvalid={!isPhoneValid}
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
    </Container>
  )
}
