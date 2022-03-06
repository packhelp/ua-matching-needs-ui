import { translations } from "./translations"

export enum LocaleDefinitions {
  PL = "pl-PL",
  UA = "uk-UA",
  EN = "en-US",
}

export enum LocaleFlags {
  "pl-PL" = "/svg/poland.svg",
  "uk-UA" = "/svg/ukraine.svg",
  "en-US" = "/svg/united-kingdom.svg",
}

export enum LocaleNames {
  "pl-PL" = "Polski",
  "uk-UA" = "український",
  "en-US" = "English",
}

export type Locale =
  | LocaleDefinitions.PL
  | LocaleDefinitions.UA
  | LocaleDefinitions.EN
export const locales = [
  LocaleDefinitions.PL,
  LocaleDefinitions.UA,
  LocaleDefinitions.EN,
]

export enum RouteDefinitions {
  Main = "/",
  AddTicket = "/tickets/add",
  AllActiveTickets = "/tickets/active",
  MyActiveTickets = "/tickets/active/mine",
  MyInactiveTickets = "/tickets/inactive/mine",
  MyClaimedTickets = "/tickets/claimed",
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
  | RouteDefinitions.MyClaimedTickets
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
