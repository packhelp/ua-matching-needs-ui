import { translations } from "./translations"

export enum LocaleDefinitions {
  PL = "pl-PL",
}

export enum LocaleFlags {
  "pl-PL" = "svg/poland.svg",
}

export enum LocaleNames {
  "pl-PL" = "Polski",
}

export type Locale = LocaleDefinitions.PL
export const locales = [LocaleDefinitions.PL]

export enum RouteDefinitions {
  AddTicket = "/tickets/add",
  AllActiveTickets = "/tickets/active",
  MyActiveTickets = "/tickets/active/mine",
  MyInactiveTickets = "/tickets/inactive/mine",
  SignIn = "/sign-in",
  TicketDetails = "/ticket/:id",
  Contact = "/contact",
}

export type Routes =
  | RouteDefinitions.AddTicket
  | RouteDefinitions.AllActiveTickets
  | RouteDefinitions.MyActiveTickets
  | RouteDefinitions.MyInactiveTickets
  | RouteDefinitions.SignIn
  | RouteDefinitions.TicketDetails
  | RouteDefinitions.Contact

export const getRouteNameForLocale = (
  route: Routes,
  locale: Locale = LocaleDefinitions.PL
) => {
  return translations[locale][route]
}
