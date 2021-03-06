import React from "react"
import { NextPage } from "next"
import { Heading, Image, Text } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { externalUrls } from "../src/utils/external-urls"
import { logotypes } from "../src/utils/logotypes"
import { useTranslations } from "../src/hooks/translations"
import styles from "./contact.module.scss"

const Contact: NextPage = () => {
  const translations = useTranslations()
  return (
    <>
      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["partners"]["with-us"]}
        </Heading>
        <div className={styles.inner}>
          <Link
            href={externalUrls.techtotherescue}
            className={styles.link}
            isExternal
          >
            <Image
              src={logotypes.techToTheRescue}
              alt="tech to the rescue"
              h="30px"
            />
          </Link>
          <Link
            href={externalUrls.castlerave}
            className={styles.link}
            isExternal
          >
            <Image src={logotypes.castleRave} alt="castle rave" h="60px" />
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["contact"]["contact-us-via"]}
        </Heading>
        <div className={styles.inner}>
          <Link href={externalUrls.slack} className={styles.link} isExternal>
            <Image
              src={logotypes.slack}
              className={styles.image}
              alt="slack icon"
            />
            <span className={styles.text}>
              {translations["contact"]["slack"]}
            </span>
          </Link>
          <Link href={externalUrls.github} className={styles.link} isExternal>
            <Image
              src={logotypes.github}
              className={styles.image}
              alt="github icon"
            />
            <span className={styles.text}>
              {translations["contact"]["github"]}
            </span>
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Heading as="h2" size="sm" mt="8px" mb="16px">
          {translations["terms-of-service"]["title"]}
        </Heading>
        <div className={styles.inner}>
          <Link href={externalUrls.terms} isExternal>
            <span
              className={styles.text}
            >{`[${translations["terms-of-service"]["title-alternate"]}]`}</span>
          </Link>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Text fontSize="md" size="sm" mt="8px" mb="16px">
          {translations["contact"]["authors"]}: Packhelp
        </Text>
        {/* <Heading as="h4" size="sm" mt="8px" mb="16px">
          {translations["contact"]["authors"]}: Packhelp
        </Heading> */}
        {/* <div className={styles.logos}>
          <Link href={externalUrls.packhelp} className={styles.link} isExternal>
            <Image src="/logo-packhelp.svg" h="30px" alt="logo packhelp" />
          </Link>
        </div> */}
      </div>
    </>
  )
}

export default Contact
