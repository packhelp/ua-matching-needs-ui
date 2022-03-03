import { Logo } from "./header-components/Logo"
import { DesktopNavigation } from "./header-components/navigation/DesktopNavigation"
import { MobileNavigation } from "./header-components/navigation/MobileNavigation"
import { UserNavigation } from "./header-components/navigation/UserNavigation"
import { AddTicketButton } from "../AddTicketButton"

export const Header = () => {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-white shadow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <MobileNavigation />
              <Logo />
              <DesktopNavigation />
            </div>
            <div className="flex items-center">
              <AddTicketButton />
              <UserNavigation />
            </div>
          </div>
        </div>
        <div id="mobile-menu-portal">{/* portal placeholder */}</div>
      </nav>
    </>
  )
}
