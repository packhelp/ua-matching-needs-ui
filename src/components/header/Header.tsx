import { Logo } from "./components/Logo"
import { DesktopNavigation } from "./components/DesktopNavigation"
import { MobileNavigation } from "./components/MobileNavigation"
import { UserNavigation } from "./components/UserNavigation"
import { AddTicketButton } from "../AddTicketButton"

import styles from "./Header.module.scss"
import { RegionSwitcher } from "./components/RegionSwitcher"

export const Header = () => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.inner}>
        <Logo />

        <DesktopNavigation />

        <div className={styles.button}>
          <AddTicketButton />
        </div>

        <UserNavigation />
        <MobileNavigation />

        <div className="hidden md:flex-shrink-0 md:flex md:items-center h-full">
          <RegionSwitcher />
        </div>
      </div>
      <div id="mobile-menu-portal">{/* portal placeholder */}</div>
    </nav>
  )
}
