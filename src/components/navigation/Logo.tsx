import React from "react"
import Link from "next/link"
import { Image } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/svg/logo.svg" alt="IniSync" height={4} />
    </Link>
  )
}
