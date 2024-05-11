import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = ({ position }) => {
  const iconSize = position === "header" ? "18px" : "14px";

  return (
    <nav className={`${styles[position]} ${styles.nav}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.nav__link} ${isActive && styles.active}`
        }
      >
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
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
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
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
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
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
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
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
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
          <use href="/images/icons.svg#icon-users-group"></use>
        </svg>
        Про нас
      </NavLink>
    </nav>
  );
};
