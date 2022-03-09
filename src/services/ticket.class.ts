import {
  LocationTag,
  TicketDetailsType,
  TicketTripDetailsType,
  TICKET_STATUS,
} from "./ticket.type"

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

  get createdDateFormattedString() {
    return new Date(this.dto.date_created).toLocaleString("pl-PL")
  }

  get isTrip() {
    return this.dto.need_type === "trip"
  }

  get trip() {
    if (this.isTrip) {
      return new NeedTransport(this.dto as any)
    }
    // safety fallback
    return this
  }

  /**
   * generic tags like "transport", "hurt" etc.
   */
  get tags() {
    return this.dto.need_tag_id
  }
}

export class NeedTransport {
  constructor(public dto: TicketTripDetailsType) {}

  get fromTag(): LocationTag {
    return this.dto.where_from_tag
  }

  get toTag(): LocationTag {
    return this.dto.where_to_tag
  }
}
