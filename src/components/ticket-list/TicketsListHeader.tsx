import React from "react"
import { Center, Spinner } from "@chakra-ui/react"

type TicketsListHeaderProps = {
  title: string
  isFetching: boolean
  count?: number
}

export const TicketsListHeader = (props: TicketsListHeaderProps) => {
  const { title, count, isFetching } = props
  return (
    <>
      {isFetching && (
        <Center h="50px" color="yellow.400" className={"absolute"}>
          <Spinner size="xl" thickness="6px" />
        </Center>
      )}
      <h1 className="my-4 text-3xl font-semibold text-center">
        {title}
        {count ? <span className="ml-2">({count})</span> : null}
      </h1>
    </>
  )
}
