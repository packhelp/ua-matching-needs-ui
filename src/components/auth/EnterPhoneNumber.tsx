import { Button, Container, FormLabel, Heading, Input } from "@chakra-ui/react"
import React, { useMemo, useState } from "react"
import { useFinalLocale } from "../../hooks/final-locale"
import { translations } from "../../utils/translations"
import { parsePhoneNumberFromString } from "libphonenumber-js/max"

interface EnterPhoneNumberProps {
  onSubmit: ({ phoneNumber: string }) => void
}

export const EnterPhoneNumber = ({ onSubmit }: EnterPhoneNumberProps) => {
  const finalLocale = useFinalLocale()

  const [phone, setPhone] = useState<string | undefined>()
  const [shouldValidate, setShouldValidate] = useState<boolean>(false)

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
    [phone, isPhoneValid],
  )

  const phoneNumber = useMemo(() => {
    return parsedPhone?.number || phone
  }, [parsedPhone, phone])

  const submitForm = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onSubmit({ phoneNumber })
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
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
    </div>
  )
}
