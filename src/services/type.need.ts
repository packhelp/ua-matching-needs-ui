export type NeedHousingTypeFormData = {
  // GENERIC START

  /**
   * Number of people
   * Can kinda work for demand side
   */
  adults: number
  children: number

  /**
   * contact
   */
  who: string
  phone: string
  alternative_contacts

  /**
   * Description
   */

  what: string
  description: string

  // GENERIC END

  need_type: "housing"

  /**
   * Locations
   * - Anywhere
   * - exact cities
   * - countries, regions, cities
   *
   * Exact:
   * - exact city
   * - exact country
   *
   * plaintext hard to pinpoint
   * dropdown is long and hard to populate
   *
   */
  where_tag: number // LocationTag ID - filter out not cit
  housing_where_string: string // plain string harder to place on map
  /**
   * Duration of stay
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
  housing_how_long_text?: string

  // Pets
  housing_pets: boolean
  housing_pets_description?: number
  housing_pets_number?: number
}
