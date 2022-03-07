import { translations } from "../translations/definitions"
import { Locale, LocaleDefinitions } from "../translations/definitions"

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

export const getRoutePathForLocale = (
  routePath: string,
  locale: Locale = LocaleDefinitions.PL
) => {
  if (locale === LocaleDefinitions.PL) {
    return routePath
  }

  return `/${locale}${routePath}`
}
