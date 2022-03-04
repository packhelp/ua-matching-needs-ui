import React from "react"
import { useRouter } from "next/router"
import {
  Locale,
  LocaleFlags,
  LocaleNames,
  locales,
} from "../../../utils/routes"
import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { Flex, Image } from "@chakra-ui/react"

export const RegionSwitcher = () => {
  const { asPath, locale } = useRouter()

  const currentLocale = locale as Locale
  return (
    <Flex alignItems={"center"} height="100%">
      <span className="h-full border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium">
        <Menu>
          <MenuButton padding={2} borderRadius={4} marginLeft={2}>
            <Image src={LocaleFlags[currentLocale]} alt="" width={22} />
          </MenuButton>
          <MenuList p={0} minW="0" w={"100px"}>
            {locales.map((locale) => {
              return (
                <Link key={locale} href={asPath} locale={locale}>
                  <MenuItem justifyContent={"center"}>
                    <Image
                      src={LocaleFlags[locale]}
                      alt={LocaleNames[locale]}
                      width={22}
                    />
                  </MenuItem>
                </Link>
              )
            })}
          </MenuList>
        </Menu>
      </span>
    </Flex>
  )
}
