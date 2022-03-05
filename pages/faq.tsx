import React from "react"
import { NextPage } from "next"
import { useTranslations } from "../src/hooks/translations"
import { Heading, Text, Link } from "@chakra-ui/react"
import { Logo } from "../src/components/header/components/Logo"
import { externalUrls } from "../src/utils/external-urls"

const Faq: NextPage = () => {
  const translations = useTranslations()
  const faqTranslations = translations["faq"]

  return (
    <>
      <div className="bg-white shadow max-w-2xl mx-auto py-4 mb-4">
        <div className="flex flex-col items-center p-8">
          <Heading as="h2" size="md" mt="8px" mb="16px">
            {faqTranslations["header"]}
          </Heading>

          <div className="mb-8">
            <Heading
              as="h3"
              size="sm"
              mt="8px"
              mb="16px"
              display="flex"
              alignItems="center"
            >
              {faqTranslations["sectionOne"]["title"]}{" "}
              <div className="ml-4">
                <Logo />
              </div>
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionOne"]["description"]}
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionTwo"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionTwo"]["description"]}
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionThree"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionThree"]["description"]}
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionFour"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionFour"]["description"]}
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionFive"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionFive"]["description"]}
            </Text>
          </div>

          <div className="mb-8 w-full">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionSix"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionSix"]["description"]}
              <Link paddingLeft="4px" href={externalUrls.terms} isExternal>
                {faqTranslations["sectionSix"]["here"]}
              </Link>
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionSeven"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionSeven"]["description"]}
            </Text>
          </div>

          <div className="mb-8">
            <Heading as="h3" size="sm" mt="8px" mb="16px">
              {faqTranslations["sectionEight"]["title"]}
            </Heading>
            <Text fontSize="sm" variant={"ghost"}>
              {faqTranslations["sectionEight"]["description"]}
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
