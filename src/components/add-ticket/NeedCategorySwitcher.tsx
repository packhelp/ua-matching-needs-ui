import { useState } from "react"
import { useTranslations } from "../../hooks/translations"
import { TagConstIds } from "../../services/types.tag"

type NeedCategorySwitcherProps = {
  transport: TagOption
  other: TagOption
}

export const NeedCategorySwitcher = (props: NeedCategorySwitcherProps) => {
  const translations = useTranslations()

  return (
    <div className="flex justify-between cursor-pointer">
      <NeedCategorySwitcherHtml {...props} />
    </div>
  )
}

type TagOption = {
  name: string
  active: boolean
  onClick: () => any
}
interface NeedCategorySwitcherHTMLProps {
  transport: TagOption
  other: TagOption
}

const NeedCategorySwitcherHtml = ({
  transport,
  other,
}: NeedCategorySwitcherHTMLProps) => {
  return (
    <>
      <div
        onClick={transport.onClick}
        className={`${
          transport.active
            ? "border border-transparent bg-blue-500 shadow-sm hover:bg-blue-600 text-white"
            : "border border-blue-500 text-black"
        } w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{transport.name}</span>
      </div>
      <div className="w-16" />
      <div
        onClick={other.onClick}
        className={`${
          other.active
            ? "border border-transparent bg-amber-300 shadow-sm hover:bg-amber-400 text-black"
            : "border border-amber-300 text-black"
        } w-full relative inline-flex justify-center items-center ml-auto px-2 py-2 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <span>{other.name}</span>
      </div>
    </>
  )
}
