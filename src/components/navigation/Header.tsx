import { AddTicket } from "./header-components/AddTicket"
import { Logo } from "./header-components/Logo"
import { DesktopNavigation } from "./header-components/navigation/DesktopNavigation"
import { MobileNavigation } from "./header-components/navigation/MobileNavigation"
import { UserNavigation } from "./header-components/navigation/UserNavigation"

export const Header = () => {
  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <MobileNavigation />
              <Logo />
              <DesktopNavigation />
            </div>
            <div className="flex items-center">
              <AddTicket />
              <UserNavigation />
            </div>
          </div>
        </div>
        <div id="mobile-menu-portal">{/* portal placeholder */}</div>
      </nav>
    </>
  )
}
