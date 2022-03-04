import React from "react"
import Link from "next/link"
import { Image } from "@chakra-ui/react"
import styles from "./Logo.module.scss"

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Image src="/svg/logo.svg" alt="IniSync" className={styles.image} />
      </Link>
    </div>
  )
}
