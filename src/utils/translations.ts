export type Locales = "pl-PL"
type Translation = {
  [k in Locales]: any
}

export const translations: Translation = {
  "pl-PL": {
    "/tickets/add": "Zgłoś potrzebę",
    "/tickets/active": "Potrzeby",
    "/tickets/active/mine": "Moje potrzeby",
    "/tickets/inactive/mine": "Moje nieaktywne potrzeby",
    "/sign-in": "Zaloguj się",
    "/contact": "Kontakt",
    pages: {
      "sign-in": {
        title: "Zaloguj się",
        label: "Podaj numer telefonu",
        placeholder: "Numer telefonu",
        next: "Dalej",
        "phone-verification": {
          title: "Zaloguj się",
          label: "Podaj kod weryfikacyjny. Został on wysłany na twój numer telefonu w wiadomości SMS.",
          placeholder: "123 456",
          next: "Dalej",
        },
      },
      main: {
        header: "Szybkie i proste zarządzenie potrzebami organizatorów",
        subheader:
          "Zgłoś potrzebę a my ją przekażemy dalej. A jeśli skończy się potrzeba, usuniesz wpis jednym kliknięciem.",
        "show-all-button": "Sprawdź potrzeby",
        "add-new-button": "Zgłoś potrzebę",
        "steps-section": {
          header: "Jak to działa?",
          "step-1-title": "Zgłaszasz potrzebę",
          "step-1-description":
            "Podając numer telefonu, co potrzebujesz i gdzie to dostarczyć zgłaszasz u nas potrzebę.",
          "step-2-title": "My publikujemy ją i szukamy rozwiązania",
          "step-2-description":
            "Automatycznie publikujemy twoją potrzebę i wysyłamy dalej do organizacji i ludzi, którzy mają to czego potrzebujesz.",
          "step-3-title": "Dezaktywujemy stare ogłoszenia",
          "step-3-description":
            "Ogłoszenie wygasa automatycznie po 3 godzinach, lub wtedy kiedy je usuniesz, tak byś nie dostawał więcej telefonów",
        },
      },
      ticket: {
        description: {
          need: "Potrzeba",
          "read-more": "Czytaj więcej",
        },
      },
    },
    "sign-out": "Wyloguj się",
  },
}
