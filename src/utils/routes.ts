import { translations } from "./translations"

export enum LocaleDefinitions {
  PL = "pl-PL",
  UA = "uk-UA",
}

export enum LocaleFlags {
  "pl-PL" = "/svg/poland.svg",
  "uk-UA" = "/svg/ukraine.svg",
}

export enum LocaleNames {
  "pl-PL" = "Polski",
  "uk-UA" = "Ukraiński",
}

export type Locale = LocaleDefinitions.PL | LocaleDefinitions.UA
export const locales = [LocaleDefinitions.PL, LocaleDefinitions.UA]

export enum RouteDefinitions {
  Main = "/",
  AddTicket = "/tickets/add",
  AllActiveTickets = "/tickets/active",
  MyActiveTickets = "/tickets/active/mine",
  MyInactiveTickets = "/tickets/inactive/mine",
  SignIn = "/sign-in",
  TicketDetails = "/ticket/:id",
  Contact = "/contact",
  Faq = "/faq",
}

export type Routes =
  | RouteDefinitions.Main
  | RouteDefinitions.AddTicket
  | RouteDefinitions.AllActiveTickets
  | RouteDefinitions.MyActiveTickets
  | RouteDefinitions.MyInactiveTickets
  | RouteDefinitions.SignIn
  | RouteDefinitions.TicketDetails
  | RouteDefinitions.Contact
  | RouteDefinitions.Faq

export const getRouteNameForLocale = (
  route: Routes,
  locale: Locale = LocaleDefinitions.PL
) => {
  return translations[locale][route]
}
