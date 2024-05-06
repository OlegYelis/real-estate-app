import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./Layout.module.css";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <header className={styles.header}>
        <Link
          to="/"
          className={`${styles.logo} ${
            location.pathname === "/" ? styles.logo__light : styles.logo__dark
          }`}
        >
          HomeNest
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.nav__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-home"></use>
            </svg>
            Головна
          </NavLink>
          <NavLink
            to="/property"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.nav__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-store"></use>
            </svg>
            Купити
          </NavLink>
          <NavLink
            to="/property"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.nav__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-building-coins"></use>
            </svg>
            Орендувати
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.nav__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-home-dollar"></use>
            </svg>
            Продати
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.active}`
            }
          >
            <svg className={styles.nav__icon} width="19px" height="19px">
              <use href="/images/icons.svg#icon-users-group"></use>
            </svg>
            Про нас
          </NavLink>
        </nav>

        <Button className={styles.btn}>
          <svg className={styles.btn__icon} width="18px" height="18px">
            <use href="/images/icons.svg#icon-user-circle"></use>
          </svg>
          Вхід
        </Button>
      </header>

      <Outlet />
    </>
  );
};
