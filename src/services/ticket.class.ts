import { TicketDetailsType, TICKET_STATUS } from "./ticket.type"

export class Ticket {
  constructor(private dto: TicketDetailsType) {}

  get hasResponses() {
    return this.dto.need_responses.length > 0
  }

  get responsesLength() {
    return this.dto.need_responses.length
  }

  get isActive() {
    return this.dto.ticket_status === TICKET_STATUS.ACTIVE
  }

  get notActive() {
    return !this.isActive
  }

  get title() {
    return this.dto.what || this.dto.description
  }

  /**
   * generic tags like "transport", "hurt" etc.
   */
  get tags() {
    return this.dto.need_tag_id
  }
}
