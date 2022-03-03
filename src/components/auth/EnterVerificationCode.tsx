import React, { useState } from "react"
import { Button, Container, FormLabel, Heading, Input } from "@chakra-ui/react"
import { translations } from "../../utils/translations"
import { useFinalLocale } from "../../hooks/final-locale"

interface EnterPhoneNumberProps {
  onSubmit: ({ verificationCode: number }) => void
}

export function EnterVerificationCode({ onSubmit }: EnterPhoneNumberProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const finalLocale = useFinalLocale()

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <form onSubmit={(event) => {
          event.preventDefault()
          onSubmit({ verificationCode })
        }}>
          <Heading as="h1" size="1xl" mb={4}>
            {translations[finalLocale]["pages"]["sign-in"]["phone-verification"]["title"]}
          </Heading>

          <FormLabel>
            {translations[finalLocale]["pages"]["sign-in"]["phone-verification"]["label"]}
          </FormLabel>
          <Input
            placeholder={
              translations[finalLocale]["pages"]["sign-in"]["phone-verification"]["placeholder"]
            }
            onChange={(event) => setVerificationCode(event.target.value)}
          />
          <Button
            type="submit"
            mt={2}
            colorScheme="blue"
            isFullWidth
          >
            {translations[finalLocale]["pages"]["sign-in"]["next"]}
          </Button>
        </form>
      </Container>
    </div>
  )
}
