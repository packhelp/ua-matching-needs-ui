import React, { ReactNode, useMemo } from "react"

import { getRootContainer } from "../services/_root-container"
import { RootContext } from "../services/_continer.hooks"

export const RootContainerWrapper = React.memo(
  function RootContainerWrapperInside({ children }: { children: ReactNode }) {
    const store = useMemo(() => getRootContainer(), [])
    return <RootContext.Provider value={store}>{children}</RootContext.Provider>
  }
)
