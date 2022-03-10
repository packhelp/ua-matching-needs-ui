import React from "react"
import { getContainerSetHooks } from "iti-react"
import { RootContainer } from "./_root-container"

export const RootContext = React.createContext<RootContainer>({} as any)

const mega = getContainerSetHooks(RootContext)
export const useContainerSet = mega.useContainerSet
export const useContainer = mega.useContainer
