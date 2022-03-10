import React, { useState } from "react"
import {
  Button,
  ButtonSpinner,
  Center,
  Container,
  FormLabel,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react"
import { useTranslations } from "../../hooks/translations"

interface EnterPhoneNumberProps {
  onSubmit: ({ verificationCode: number }) => Promise<void>
}

export function EnterVerificationCode({ onSubmit }: EnterPhoneNumberProps) {
  const [verifying, setVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const translations = useTranslations()

  return (
    <div className="bg-white shadow rounded-lg max-w-2xl mx-auto">
      <Container className="px-4 py-5 sm:p-6">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setVerifying(true)
            onSubmit({ verificationCode }).finally(() => setVerifying(false))
          }}
        >
          <Center>
            <Image
              src="/phone-verify.svg"
              maxW="300px"
              mb="30px"
              mt="20px"
              alt="phone verify"
            />
          </Center>

          <Heading as="h1" size="1xl" mb={4}>
            {translations["pages"]["sign-in"]["phone-verification"]["title"]}
          </Heading>

          <FormLabel>
            {translations["pages"]["sign-in"]["phone-verification"]["label"]}
          </FormLabel>
          <Input
            placeholder={
              translations["pages"]["sign-in"]["phone-verification"][
                "placeholder"
              ]
            }
            onChange={(event) => setVerificationCode(event.target.value)}
            type="number"
            inputMode="decimal"
            autoFocus={true}
          />
          <Button
            type="submit"
            mt={2}
            colorScheme="blue"
            isFullWidth
            disabled={verifying}
          >
            {verifying ? (
              <ButtonSpinner />
            ) : (
              translations["pages"]["sign-in"]["next"]
            )}
          </Button>
        </form>
      </Container>
    </div>
  )
}
