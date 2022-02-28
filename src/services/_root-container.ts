import { makeRoot } from "iti"

export function getRootContainer() {
  return makeRoot()
}
export type RootContainer = ReturnType<typeof getRootContainer>
