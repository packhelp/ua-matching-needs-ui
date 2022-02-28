export type Locales = "pl-PL"
type Translation = {
  [k in Locales]: any
}

export const translations: Translation = {
  "pl-PL": {
    "/tickets/add": "",
    "/tickets/active": "",
    "/tickets/active/mine": "",
    "/tickets/inactive/mine": "",
  },
}
