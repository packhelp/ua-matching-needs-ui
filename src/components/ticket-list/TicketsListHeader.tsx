import React from "react"

type TicketsListHeaderProps = {
  title: string
  count?: number
}

export const TicketsListHeader = (props: TicketsListHeaderProps) => {
  const { title, count } = props
  return (
    <h1 className="my-4 text-3xl font-semibold text-center">
      {title}
      {count && <span className="ml-2">({count})</span>}
    </h1>
  )
}
