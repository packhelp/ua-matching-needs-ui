import React from "react"

type TicketsListHeaderProps = {
  title: string
}

export const TicketsListHeader = (props: TicketsListHeaderProps) => {
  const { title } = props
  return <h1 className="my-4 text-3xl font-semibold text-center">{title}</h1>
}
