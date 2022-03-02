import React from "react"
import Link from "next/link"
import { Image } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href="/">
        <a>
          <Image src="/svg/logo.svg" alt="IniSync" height={4} />
        </a>
      </Link>
    </div>
  )
}
