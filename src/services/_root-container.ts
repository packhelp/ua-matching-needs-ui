import { makeRoot } from "iti"
import { directusApiInstance, TicketService } from "./directus-api"

export function getRootContainer() {
  return makeRoot()
    .add({
      directuInstance: () => directusApiInstance(),
    })
    .add((ctx) => ({ ticketService: new TicketService(ctx.directuInstance) }))
}
export type RootContainer = ReturnType<typeof getRootContainer>
