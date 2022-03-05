import type { TicketService } from "./directus-api"

export const LOCAL_STORAGE_KEY_VISITS_COUNTER = "visits-counter"
export const TICKET_MARKED_AS_VISITED = "visited"

const getLocalStorageVisitsCounterKey = (ticketId: number): string => {
  return `${LOCAL_STORAGE_KEY_VISITS_COUNTER}-${ticketId}`
}
const shouldCountVisit = (ticketId: number): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem(getLocalStorageVisitsCounterKey(ticketId)) !==
      TICKET_MARKED_AS_VISITED
    )
  }

  return false
}
const blockVisitsCounterFor = (ticketId: number): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      getLocalStorageVisitsCounterKey(ticketId),
      TICKET_MARKED_AS_VISITED
    )
  }
}

export class VisitCounter {
  constructor(private ticketService: TicketService) {}

  countVisitOnce = async (ticketId: number) => {
    if (shouldCountVisit(ticketId)) {
      try {
        const ticket = await this.ticketService.ticket(ticketId)
        const newVisits = ticket ? ticket.visits + 1 : 1
        await this.ticketService.update(ticketId, { visits: newVisits })
        console.debug("Incremented visits counter")
        blockVisitsCounterFor(ticketId)
      } catch (e: any) {
        console.debug("The visits counter hasn't been updated ")
      }
    }
  }
}
