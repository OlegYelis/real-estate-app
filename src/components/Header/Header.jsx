import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { NavBar } from "../NavBar/NavBar";

export const Header = () => {
  const location = useLocation();

  return (
    <header className={`${location.pathname === "/" ? styles.header : ""}`}>
      <div className={styles.container}>
        <Link
          to="/"
          className={`${styles.logo} ${
            location.pathname === "/" ? styles.logo__light : styles.logo__dark
          }`}
        >
          HomeNest
        </Link>

        <NavBar position="header" />

        <Link to="/auth" className={styles.btn}>
          <svg className={styles.btn__icon} width="18px" height="18px">
            <use href="/images/icons.svg#icon-user-circle"></use>
          </svg>
          Вхід
        </Link>
      </div>
    </header>
  );
};
