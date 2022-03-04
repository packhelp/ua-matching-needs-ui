import React from "react"
import { NextPage } from "next"
import {
  Heading,
  Flex,
  Button,
  Image,
  Text,
} from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { externalUrls } from "../src/utils/external-urls"
import { useTranslations } from "../src/hooks/translations"
import styles from "./contact.module.scss"

const Contact: NextPage = () => {
  const translations = useTranslations()
  return (
    <>
      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["contact"]["authors"]}
        </Heading>
        <div className={styles.logos}>
          <Link href={externalUrls.packhelp} className={styles.link}>
            <Image src="/logo-packhelp.svg" h="30px" />
          </Link>
          <Link href={externalUrls.techtotherescue} className={styles.link}>
            <Image src="/logo-tttr.png" h="40px" />
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["contact"]["contact-us-via"]}
        </Heading>
        <div className={styles.inner}>
          <Link href={externalUrls.slack} className={styles.link}>
            <Image src="/svg/slack.svg" className={styles.image} />
            <span className={styles.text}>{translations["contact"]["slack"]}</span>
          </Link>
          <Link href={externalUrls.github} className={styles.link}>
            <Image src="/svg/github.svg" className={styles.image} />
            <span className={styles.text}>{translations["contact"]["github"]}</span>
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["terms-of-service"]["title"]}
        </Heading>
        <div className={styles.inner}>
          <Link href={externalUrls.terms} isExternal>
            <span className={styles.text}>{`[${translations["terms-of-service"]["title-alternate"]}]`}</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Contact
