import {
  LocationTag,
  MapboxResult,
  TicketDetailsType,
  TicketTripDetailsType,
  TICKET_STATUS,
} from "./ticket.type"
import { NeedHousingTypeFormData } from "./type.need"
import { RouteDefinitions } from "../utils/routes"

export class Ticket {
  constructor(private dto: TicketDetailsType) {}

  get id() {
    return this.dto.id
  }

  get hasResponses() {
    return this.dto.need_responses.length > 0
  }

  get responsesLength() {
    return this.dto.need_responses.length
  }

  get requester() {
    const organization = this.dto.organization_id

    return {
      verified: !!organization,
      name: organization ? organization.name : this.dto.who,
    }
  }

  get url() {
    return RouteDefinitions.TicketDetails.replace(":id", String(this.dto.id))
  }

  get phone() {
    return this.dto.phone
  }

  get isPhonePublic() {
    return this.dto.phone_public
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

  get isHousing() {
    return this.dto.need_type === "housing_v2"
  }

  get hasAdults() {
    return this.dto?.adults > 0
  }
  get hasChildren() {
    return this.dto?.children > 0
  }
  get hasPets() {
    return this.dto.has_pets
  }

  get getHousing(): NeedHousing {
    if (this.isHousing) {
      return new NeedHousing(this.dto as any)
    }
    return this as any
  }

  get trip() {
    if (this.isTrip) {
      return new NeedTransport(this.dto as any)
    }
    return this
  }

  get where() {
    return this.dto.where
  }

  /**
   * generic tags like "transport", "hurt" etc.
   */
  get tags() {
    return this.dto.need_tag_id
  }

  /** Placeholder */
  get isNeed() {
    return true
  }

  /** Placeholder */
  get isOffer() {
    return false
  }
}

export class NeedTransport {
  constructor(public dto: TicketTripDetailsType) {}

  get fromTag(): MapboxResult {
    return this.dto.where_from
  }

  get toTag(): MapboxResult {
    return this.dto.where_destination
  }
}

export class NeedHousing extends Ticket {
  constructor(public dtoHousing: NeedHousingTypeFormData) {
    super(dtoHousing as any)
  }

  // get fromTag(): LocationTag {
  //   return this.dto.where_from_tag
  // }

  // get toTag(): LocationTag {
  //   return this.dto.where_to_tag
  // }
}
