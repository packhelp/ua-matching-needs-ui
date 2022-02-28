export type Locales = "pl-PL"
type Translation = {
  [k in Locales]: any
}

export const translations: Translation = {
  "pl-PL": {
    "/tickets/add": "Dodaj ticket",
    "/tickets/active": "Wszystkie aktywne tickety",
    "/tickets/active/mine": "Moje aktywne tickety",
    "/tickets/inactive/mine": "Moje nieaktywne tickety",
    "/sign-in": "Zaloguj się",
    pages: {
      "sign-in": {
        title: "Zaloguj się",
        label: "Podaj numer telefonu",
        placeholder: "Numer telefonu",
        next: "Dalej",
      },
    },
  },
}
