import React, { useContext } from "react"
import { getContainerSetHooks } from "iti-react"
import { RootContainer } from "./_root-container"

export const RootContext = React.createContext<RootContainer>({} as any)

let mega = getContainerSetHooks(RootContext)
export const useContainerSet = mega.useContainerSet
export const useContainer = mega.useContainer
