import React from "react"
import { NextPage } from "next"
import { Image, Link } from "@chakra-ui/react"
import { externalUrls } from "../src/utils/external-urls"
import { logotypes } from "../src/utils/logotypes"
import { useTranslations } from "../src/hooks/translations"
import styles from "./partners.module.scss"

const Partners: NextPage = () => {
  const translations = useTranslations()
  return (
    <>
      <h1 className="my-4 text-3xl font-semibold text-center">
        {translations["partners"]["with-us"]}
      </h1>
      <div className={styles.wrapper}>
        <Link href={externalUrls.techtotherescue} className={styles.link}>
          <Image src={logotypes.techToTheRescue} />
        </Link>
        <Link href={externalUrls.castlerave} className={styles.link}>
          <Image src={logotypes.castleRave} />
        </Link>
      </div>
    </>
  )
}

export default Partners
