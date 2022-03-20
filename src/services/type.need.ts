import { JsonObject } from "type-fest"
import { TagConstIds } from "./types.tag"
import { MapboxResult } from "./ticket.type"

/**
 * Required
 * Where - location
 * Date In
 * Date Out
 */
export type NeedHousingTypeFormData = {
  // GENERIC START

  /**
   * contact
   */
  who?: string
  phone: string
  /**
   * Number of people
   * Can kinda work for demand side
   */
  adults?: number
  children?: number

  alternative_contacts?: string // new email, telegram etc.

  /**
   * Description
   */

  what?: string
  description?: string
  expirationTimestampSane: string // Date

  /**
   * for display leftoevers
   */
  need_tag_id: [{ need_tag_id: { id: TagConstIds } }]

  // GENERIC END

  need_type: "housing_v2"

  /**
   * Housing times
   * In case of places to sleep dates/time is the most important.
   *
   * I need it right now for about 10 days
   * I need it from March 15th
   * I need it for 2 night next week
   *
   * When?
   * How long
   *
   * # Duration of stay
   *
   * could have simple options like:
   * - 1 day
   * - coupole of days
   * - week or two
   * - months
   *
   * or:
   * - no idea
   * - until the war ends
   * - until find something different
   */
  housing_when_arrive_text?: string
  housing_when_arrive: string // Date
  housing_arrive_exact: boolean // a separate

  housing_when_leave_text?: string
  housing_when_leave: string | undefined // Date  Calendar (UI)
  housing_leave_exact: boolean // In V2 we can have pills to indicate uncertain duration like "couple of days" etc.

  /**
   * Payments
   *
   * I am willing to pay
   */
  //  housing_can_help_with_rent   /V2
  //  housing_can_help_with_description
  housing_can_help_with_rent: boolean

  // Pets
  housing_pets: boolean
  housing_pets_number?: number
  housing_pets_description?: string
}
