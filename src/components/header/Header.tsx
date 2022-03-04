import { Logo } from "./components/Logo"
import { DesktopNavigation } from "./components/DesktopNavigation"
import { MobileNavigation } from "./components/MobileNavigation"
import { UserNavigation } from "./components/UserNavigation"
import { AddTicketButton } from "../AddTicketButton"
import styles from "./Header.module.scss"


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
      </div>
      <div id="mobile-menu-portal">
        {/* portal placeholder */}
      </div>
    </nav>
  )
}
