import { makeRoot } from "iti"
import { directusApiInstance, TicketService } from "./directus-api"
import { VisitCounter } from "./visit-counter"

export function getRootContainer() {
  return makeRoot()
    .add({
      directuInstance: () => directusApiInstance(),
    })
    .add((ctx) => ({
      ticketService: () => new TicketService(ctx.directuInstance),
    }))
    .add((ctx) => ({
      visitCounter: () => new VisitCounter(ctx.ticketService),
    }))
}
export type RootContainer = ReturnType<typeof getRootContainer>
