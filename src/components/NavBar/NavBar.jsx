import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = ({ position }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentDealType = searchParams.get("deal_type");

  const iconSize = position === "header" ? "18px" : "14px";

  const isActiveLink = (dealType) => {
    const isSearchPage = location.pathname.includes("/search");
    return (
      isSearchPage &&
      (currentDealType === dealType ||
        (!currentDealType && dealType === "sell"))
    );
  };

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
        to="/search?deal_type=sell"
        className={`${styles.nav__link} ${
          isActiveLink("sell") && styles.active
        }`}
      >
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
          <use href="/images/icons.svg#icon-store"></use>
        </svg>
        Купити
      </NavLink>

      <NavLink
        to="/search?deal_type=rent"
        className={`${styles.nav__link} ${
          isActiveLink("rent") && styles.active
        }`}
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
        to="/favorites"
        className={({ isActive }) =>
          `${styles.nav__link} ${isActive && styles.active}`
        }
      >
        <svg className={styles.nav__icon} width={iconSize} height={iconSize}>
          <use href="/images/icons.svg#icon-heart"></use>
        </svg>
        Обрані
      </NavLink>
    </nav>
  );
};
